local isUIOpen = false
local isCrosshairActive = false
local currentExpansion = 1.0
local dynamicEnabled = false

-- Keybinds
RegisterKeyMapping('crosshair:open', 'Open Crosshair Settings', 'keyboard', Config.OpenKey)
RegisterKeyMapping('crosshair:toggle', 'Toggle Crosshair', 'keyboard', Config.ToggleKey)

if Config.CyclePresetKey ~= '' then
    RegisterKeyMapping('crosshair:cycle', 'Cycle Crosshair Preset', 'keyboard', Config.CyclePresetKey)
end

-- Commands
RegisterCommand('crosshair:open', function()
    ToggleUI()
end, false)

RegisterCommand('crosshair:toggle', function()
    ToggleCrosshair()
end, false)

RegisterCommand(Config.Command, function()
    ToggleUI()
end, false)

RegisterCommand('crosshair:cycle', function()
    CyclePreset()
end, false)

-- KVP helpers
local function GetKVPJson(key)
    local raw = GetResourceKvpString(key)
    if not raw or raw == '' then return nil end
    return json.decode(raw)
end

local function SetKVPJson(key, value)
    SetResourceKvp(key, json.encode(value))
end

-- Load all saved settings from KVP
local function LoadSettings()
    return GetKVPJson('crosshair:settings')
end

local function SaveSettings(settings)
    SetKVPJson('crosshair:settings', settings)
end

local function LoadPresets()
    return GetKVPJson('crosshair:presets') or {}
end

local function SavePresets(presets)
    SetKVPJson('crosshair:presets', presets)
end

local function LoadEnabled()
    local val = GetResourceKvpString('crosshair:enabled')
    if val == nil then return false end
    return val == 'true'
end

local function SaveEnabled(enabled)
    SetResourceKvp('crosshair:enabled', enabled and 'true' or 'false')
end

local function LoadDynamicEnabled()
    local val = GetResourceKvpString('crosshair:dynamic')
    if val == nil then return false end
    return val == 'true'
end

local function SaveDynamicEnabled(enabled)
    SetResourceKvp('crosshair:dynamic', enabled and 'true' or 'false')
end

-- UI open/close
function ToggleUI()
    isUIOpen = not isUIOpen
    SetNuiFocus(isUIOpen, isUIOpen)

    if isUIOpen then
        SendNUIMessage({
            action = 'openUI',
            data = {
                settings = LoadSettings(),
                presets = LoadPresets(),
                enabled = isCrosshairActive,
                dynamicEnabled = dynamicEnabled,
                config = {
                    maxPresets = Config.MaxPresets,
                    dynamicAllowed = Config.DynamicCrosshair.enabled,
                    defaultDynamic = {
                        movementExpansion = Config.DynamicCrosshair.movementExpansion,
                        sprintExpansion = Config.DynamicCrosshair.sprintExpansion,
                        aimShrink = Config.DynamicCrosshair.aimShrink,
                        transitionSpeed = Config.DynamicCrosshair.transitionSpeed,
                    },
                },
            },
        })
    else
        SendNUIMessage({ action = 'closeUI' })
    end
end

function ToggleCrosshair()
    isCrosshairActive = not isCrosshairActive
    SaveEnabled(isCrosshairActive)
    SendNUIMessage({
        action = 'toggleCrosshair',
        data = { enabled = isCrosshairActive },
    })
end

function CyclePreset()
    SendNUIMessage({ action = 'cyclePreset' })
end

-- NUI Callbacks
RegisterNUICallback('close', function(_, cb)
    isUIOpen = false
    SetNuiFocus(false, false)
    cb('ok')
end)

RegisterNUICallback('saveSettings', function(data, cb)
    SaveSettings(data.settings)
    isCrosshairActive = data.enabled
    SaveEnabled(isCrosshairActive)
    dynamicEnabled = data.dynamicEnabled or false
    SaveDynamicEnabled(dynamicEnabled)
    cb('ok')
end)

RegisterNUICallback('toggleCrosshair', function(data, cb)
    isCrosshairActive = data.enabled
    SaveEnabled(isCrosshairActive)
    cb('ok')
end)

RegisterNUICallback('savePresets', function(data, cb)
    local presets = data.presets or {}
    if #presets > Config.MaxPresets then
        cb({ error = 'Max presets reached' })
        return
    end
    SavePresets(presets)
    cb('ok')
end)

RegisterNUICallback('setDynamic', function(data, cb)
    dynamicEnabled = data.enabled
    SaveDynamicEnabled(dynamicEnabled)
    cb('ok')
end)

-- Restore state on resource start
CreateThread(function()
    isCrosshairActive = LoadEnabled()
    dynamicEnabled = LoadDynamicEnabled()

    local settings = LoadSettings()
    if settings then
        SendNUIMessage({
            action = 'restoreState',
            data = {
                settings = settings,
                presets = LoadPresets(),
                enabled = isCrosshairActive,
                dynamicEnabled = dynamicEnabled,
            },
        })
    end
end)

-- Dynamic crosshair thread
CreateThread(function()
    if not Config.DynamicCrosshair.enabled then return end

    local lastState = 'idle'
    local targetExpansion = 1.0

    while true do
        if isCrosshairActive and dynamicEnabled then
            local ped = PlayerPedId()
            local playerId = PlayerId()
            local newState = 'idle'

            if IsPlayerFreeAiming(playerId) then
                newState = 'aiming'
                targetExpansion = Config.DynamicCrosshair.aimShrink
            elseif IsPedSprinting(ped) then
                newState = 'sprinting'
                targetExpansion = Config.DynamicCrosshair.sprintExpansion
            elseif IsPedRunning(ped) or IsPedWalking(ped) then
                newState = 'moving'
                targetExpansion = Config.DynamicCrosshair.movementExpansion
            elseif IsPedInAnyVehicle(ped, false) then
                newState = 'vehicle'
                targetExpansion = 1.0
            else
                newState = 'idle'
                targetExpansion = 1.0
            end

            -- Lerp expansion
            local dt = GetFrameTime()
            local speed = Config.DynamicCrosshair.transitionSpeed
            currentExpansion = currentExpansion + (targetExpansion - currentExpansion) * math.min(dt * speed, 1.0)

            if newState ~= lastState or math.abs(currentExpansion - targetExpansion) > 0.01 then
                SendNUIMessage({
                    action = 'dynamicUpdate',
                    data = { expansion = currentExpansion },
                })
                lastState = newState
            end

            Wait(0)
        else
            -- Reset expansion when disabled
            if currentExpansion ~= 1.0 then
                currentExpansion = 1.0
                SendNUIMessage({
                    action = 'dynamicUpdate',
                    data = { expansion = 1.0 },
                })
            end
            Wait(500)
        end
    end
end)

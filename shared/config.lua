Config = {}

-- Keybinds (remappable in FiveM Settings > Key Bindings > FiveM)
Config.OpenKey = 'F7'           -- Open crosshair customizer UI
Config.ToggleKey = 'H'          -- Quick toggle crosshair on/off
Config.CyclePresetKey = ''      -- Cycle through saved presets (empty = disabled)
Config.Command = 'crosshair'   -- Chat command to open UI

-- Defaults
Config.DefaultPreset = 'classic'  -- Starting preset for new players
Config.MaxPresets = 10            -- Max custom presets per player

-- Dynamic Crosshair
Config.DynamicCrosshair = {
    enabled = true,             -- Allow players to use dynamic crosshair
    movementExpansion = 1.5,    -- Multiplier when walking/running
    sprintExpansion = 2.5,      -- Multiplier when sprinting
    aimShrink = 0.7,            -- Multiplier when aiming
    transitionSpeed = 8.0,      -- Lerp speed between states
}

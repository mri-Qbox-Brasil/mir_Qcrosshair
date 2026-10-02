fx_version 'cerulean'
game 'gta5'

author 'Level5 Dev'
description 'Premium crosshair customizer with presets, shapes, and dynamic crosshair'
version '2.0.0'

shared_script 'shared/config.lua'

client_script 'client/main.lua'

ui_page 'html/index.html'

files {
    'html/index.html',
    'html/assets/**/*',
}

escrow_ignore {
    'shared/config.lua',
    'client/main.lua',
}

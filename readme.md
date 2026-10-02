# Level5 Crosshair

A premium crosshair customizer for FiveM. Gives your players full control over their crosshair with a sleek in-game UI, multiple shapes, presets, dynamic behavior and more. Standalone - no framework required.

## Features

- **8 Crosshair Shapes** - Cross, Dot, Circle, T-Shape, X-Shape, Cross+Dot, Circle+Dot, Circle+Cross
- **6 Built-in Presets** - Classic, Dot, Sniper, Minimal, T-Style, X-Mark - ready to use out of the box
- **Custom Presets** - Players can save, load and delete up to 10 personal presets
- **Full Customization** - Color, outline color, thickness, length, gap, opacity, dot toggle, dot size, circle size
- **Dynamic Crosshair** - Crosshair reacts to player state: expands when moving/sprinting, shrinks when aiming, with configurable multipliers and transition speed
- **Import/Export** - Share crosshair configurations with other players via encoded string
- **Remappable Keybinds** - Open UI, toggle crosshair on/off, cycle presets - all remappable through FiveM settings
- **Persistent Settings** - All settings saved client-side via KVP, survive reconnects and server restarts
- **Live Preview** - See changes in real-time while customizing
- **Standalone** - No framework dependency, works on any server
- **Performant** - Minimal resource usage, dynamic thread only active when needed

## Installation

1. Place the `Level5_Crosshair` folder in your server's `resources` directory
2. Add `ensure Level5_Crosshair` to your `server.cfg`
3. Restart your server

## Configuration

All configuration is in `shared/config.lua`:

| Option | Default | Description |
|--------|---------|-------------|
| `Config.OpenKey` | `F7` | Key to open the crosshair customizer |
| `Config.ToggleKey` | `H` | Key to toggle crosshair on/off |
| `Config.CyclePresetKey` | *(empty)* | Key to cycle through presets (disabled by default) |
| `Config.Command` | `crosshair` | Chat command to open the UI |
| `Config.DefaultPreset` | `classic` | Starting preset for new players |
| `Config.MaxPresets` | `10` | Maximum custom presets per player |
| `Config.DynamicCrosshair` | *(table)* | Dynamic crosshair settings (enabled, multipliers, speed) |

All keybinds are remappable by players in **FiveM Settings > Key Bindings > FiveM**.

## Usage

- Press **F7** (default) or type `/crosshair` to open the customizer
- Press **H** (default) to toggle the crosshair on/off
- Use the UI to pick a shape, adjust settings, save presets, or import/export configs

---

Made by **Level5 Development**
- Store: https://lvl5-dev.tebex.io/
- Discord: https://discord.gg/4maCSRnkaS

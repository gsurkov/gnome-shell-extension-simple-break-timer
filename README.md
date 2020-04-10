# Simple Break Timer
## GNOME Shell extension

This extension provides a simple timer (hence the name) to remind the user to take a break from their work. 

Due to its limited feature set and small code size, it should be easier to maintain compatibility with future releases of GNOME Shell.
Currently it has been tested with version 3.36.

## Features
* Timer display on top panel
* Customisable work and break intervals
* Shell notifications (optional)
* Automatic start on login (optional)

## Installation
Default user installation:
```sh
make install
```
System installation:
```sh
sudo make install PREFIX=/usr
```

Restart GNOME Shell to apply changes.

## Packaging support
Additionally, you can specify DESTDIR:
```sh
make install DESTDIR=./build PREFIX=/usr
```
Zip archive can be obtained by using:
```sh
make zip
```

## TODO
 - [ ] Localisation support
 - [ ] Option for indicator position
 - [ ] Option to disable indicator icon
 - [ ] Preferences access from main menu
 - [ ] Upload on gnome-extensions
 - [ ] Arch Linux package

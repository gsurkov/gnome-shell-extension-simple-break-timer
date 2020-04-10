/* 
 * This file is part of Simple Break Timer Gnome-Shell extension.
 * Copyright (c) 2020 Georgii Surkov.
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

const MainLoop = imports.mainloop;

var Timer = class {
    constructor() {
        this._timeout = null;
        this._count = 0;

        this._callbacks = {
            'update': null,
            'timeout': null
        };
    }

    start(count) {
        this._count = count;

        this.stop();        
        this._update();
        
        this._timeout = MainLoop.timeout_add_seconds(1.0, () => this._update());
    }

    stop() {
        if(this._timeout) {
            MainLoop.source_remove(this._timeout);
            this._timeout = null;
        }
    }

    //Possible events: 'update', 'timeout'
    on(event, callback) {
        this._callbacks[event] = callback;
    }

    _update() {
        this._callbacks['update'](this._count);
        this._count -= 1;

        const stop = (this._count < 0);

        if(stop) {
            this._callbacks['timeout']();
        }

        return !stop;
    }
};
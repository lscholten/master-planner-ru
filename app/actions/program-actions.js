import jQuery from 'jquery';

import AppDispatcher from '../core/app-dispatcher';
import { ProgramActionTypes } from '../stores/program-store';

export function loadPrograms() {
    jQuery.ajax({
        url: "data/programs.json",
        dataType: 'json',
        cache: false,
        success: (data) => {
            console.log(data);
            AppDispatcher.dispatch({
                type: ProgramActionTypes.SET_PROGRAMS,
                programs: data
            });
        }
    });
}

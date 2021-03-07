export interface DatatypeInfo {
    regist_name      : string,
    regist_value     : string,
    regist_datatype  : string,
    regist_status    : string,
    regist_color     : string,
    regist_icon      : string,
    regist_conten    : string,
    regist_opcselect : [{co_compag: string | null, no_compag: string | null}],
    regist_pagref    : number,
    regist_plholder  : string,
    regist_dialogCon : number,
    regist_title     : string,
    isHide           : boolean,
    isReadOnly       : boolean
}

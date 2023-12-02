import React from "react";
import './topbar.css'
import {NotificationsNone, Language, Settings} from '@material-ui/icons';

export default function Topbar() {
    return(
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">company</span>
                </div>
                <div className="topRight">
                    <div className="topbarIcons">
                        <NotificationsNone className="tbicon"/>
                        <Language className="tbicon"/>
                        <Settings />
                    </div>
                </div>
            </div>
        </div>
    )
}
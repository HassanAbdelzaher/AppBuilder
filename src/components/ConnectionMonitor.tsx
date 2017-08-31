import * as React from 'react';

export interface ConnectionMonitorProps {
    ConnState? : CONNECTION_STATUS
}

export enum CONNECTION_STATUS {
    CONNECTED=1,
    CONNECTING,
    FAILED,
    CONNECTION_FAILED,
    DISCONNECTED,
    NOTHING
}
const style : React.CSSProperties = {
        position: 'absolute',
        left: 20,
        bottom: 20,
        opacity: 0.6,
        zIndex: 999999,
        color: 'white',
        padding: 5,
        fontWeight: 'bold',
        fontSize: '12'
    }
    export class ConnectionMonitor extends React.Component < ConnectionMonitorProps,any > {

        render() {
            let color = 'red';
            let title = 'غير متصل';
            console.log(this.props.ConnState);
            if (this.props.ConnState == CONNECTION_STATUS.CONNECTED) {
                color = 'green';
                title='متصل'
            }
            if (this.props.ConnState == CONNECTION_STATUS.CONNECTING) {
                color = 'orange';
                title='جاري الاتصال';
            }
            if (this.props.ConnState == CONNECTION_STATUS.CONNECTION_FAILED) {
                color = 'red';
                title='خطأ في الاتصال';
            }

            if (this.props.ConnState == CONNECTION_STATUS.FAILED) {
                color = 'red';
                title='خطأ في نقل او استقبال البيانات';
            }
            let st = {
                ...style,
                ...{
                    background: color
                }
            }
            return <div style={st}>{title}</div>
        }
    }
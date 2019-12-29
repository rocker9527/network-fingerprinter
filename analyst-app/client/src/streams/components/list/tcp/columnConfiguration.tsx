import { ColumnProps } from 'antd/lib/table';
import { ITcpStreamView } from 'DAL/Stream/Tcp/ITcpStreamView';
import { TFunction } from 'i18next';
import { I18StreamsNsKeys } from 'root/i18n/resources/streams/keys';
import React from 'react';
import { renderStreamDateTime } from 'root/streams/components/list/tcp/columns/renderDateTime';
import { renderStreamSide } from 'root/streams/components/list/tcp/columns/side/renderSide';
import { renderFingerprint } from 'root/streams/components/list/tcp/columns/fingerprint/renderFingerprint';
import { renderInfo } from 'root/streams/components/list/tcp/columns/info/renderInfo';
import { DateTimeService } from 'root/shared/utils/dateTime/DateTimeService';
import { StreamDatesOrder } from 'root/streams/model/list/streamDatesOrder';
import { getAntdDateTimeOrder } from 'root/streams/components/list/tcp/getAntdDateTimeOrder';

export function createColumnsConfiguration(
    startDateTimeOrder: StreamDatesOrder | undefined,
    endDateTimeOrder: StreamDatesOrder | undefined,
    t: TFunction,
): ColumnProps<ITcpStreamView>[] {
    const startDateTimeAntdOrder = getAntdDateTimeOrder(startDateTimeOrder);
    const endDateTimeAntdOrder = getAntdDateTimeOrder(endDateTimeOrder);
    return [
        {
            title: '',
            key: 'common',
            width: '14%',
            render: text => renderInfo(text, t),
        },
        {
            title: t(I18StreamsNsKeys.listDateTimeColumnTitle),
            key: 'datetime',
            children: [
                {
                    title: t(I18StreamsNsKeys.listStartDateTimeColumnTitle),
                    key: 'startDateTime',
                    dataIndex: 'startDateTime',
                    sorter: true,
                    sortOrder: startDateTimeAntdOrder,
                    render: startDateTime => renderStreamDateTime(startDateTime),
                    width: '9%',
                },
                {
                    title: t(I18StreamsNsKeys.listEndDateTimeColumnTitle),
                    key: 'endDateTime',
                    dataIndex: 'endDateTime',
                    sorter: true,
                    sortOrder: endDateTimeAntdOrder,
                    render: endDateTime => renderStreamDateTime(endDateTime),
                    width: '9%',
                },
            ]
        },
        {
            title: t(I18StreamsNsKeys.listAddressColumnTitle),
            key: 'address',
            children: [
                {
                    title: t(I18StreamsNsKeys.listSourceColumnTitle),
                    key: 'sourceAddress',
                    render: (_, record) => renderStreamSide({
                        ip: record.sourceIp,
                        port: record.sourcePort,
                        mac: record.sourceMac,
                        t,
                    }),
                    width: '15%',
                },
                {
                    title: t(I18StreamsNsKeys.listDestinationColumnTitle),
                    key: 'destinationAddress',
                    render: (_, record) => renderStreamSide({
                        ip: record.destinationIp,
                        port: record.destinationPort,
                        mac: record.destinationMac,
                        t,
                    }),
                    width: '15%',
                },
            ],
        },
        {
            title: t(I18StreamsNsKeys.listFingerprintColumnTitle),
            key: 'fingerprints',
            children: [
                {
                    title: t(I18StreamsNsKeys.listSourceColumnTitle),
                    key: 'sourceFingerprints',
                    dataIndex: 'sourceFingerprints',
                    render: text => renderFingerprint({ fingerprints: text, t }),
                    width: '19%',
                },
                {
                    title: t(I18StreamsNsKeys.listDestinationColumnTitle),
                    key: 'destinationFingerprints',
                    dataIndex: 'destinationFingerprints',
                    render: text => renderFingerprint({ fingerprints: text, t }),
                    width: '19%',
                },
            ],
        },
    ];
}

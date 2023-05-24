import React from 'react';
import Realm from 'realm';
import { createRealmContext } from '@realm/react';

export default class NewsHeadline extends Realm.Object {
    static schema = {
        name: 'NewsHeadline',
        properties: {
            _id: 'objectId',
            news: { type: 'list', objectType: 'NewsItem' }
        },
        primaryKey: '_id',
    };
}

export class NewsItem extends Realm.Object {
    static schema = {
        name: 'NewsItem',
        properties: {
            title: 'string',
            content: 'string',
        },
    };
}

const realmConfig = {
    schema: [NewsHeadline, NewsItem],
};

export const { RealmProvider, useRealm, useObject, useQuery } = createRealmContext(realmConfig);

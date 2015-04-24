﻿/// <reference path="../_references.d.ts" />
import ModelInterfaces = require('./ModelInterfaces');
import Bluebird = require('bluebird');

export = ModelCache;

class ModelCache {
    constructor(public model: ModelInterfaces.IModelBase) {

    }

    set<T>(value: T): Bluebird<T> {
        if (!this.model.cacheDirector || !this.model.cacheDirector.valid(value)) return Bluebird.resolve(value);
        return this.model.core.cache.set(this.model.cacheDirector.buildKey(value), value);
    }

    get<T>(conditions: any): Bluebird<T> {
        if (!this.model.cacheDirector || !this.model.cacheDirector.validQuery(conditions)) return Bluebird.resolve(<T>null);
        return this.model.core.cache.get<T>(this.model.cacheDirector.buildQueryKey(conditions));
    }

    clear(conditions: any): Bluebird<boolean> {
        if (!this.model.cacheDirector || !this.model.cacheDirector.validQuery(conditions)) return Bluebird.resolve(false);
        return this.model.core.cache.clear(this.model.cacheDirector.buildQueryKey(conditions));
    }
}

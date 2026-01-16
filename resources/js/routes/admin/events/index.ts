import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\EventController::index
 * @see app/Http/Controllers/Admin/EventController.php:13
 * @route '/admin/events'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/events',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EventController::index
 * @see app/Http/Controllers/Admin/EventController.php:13
 * @route '/admin/events'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EventController::index
 * @see app/Http/Controllers/Admin/EventController.php:13
 * @route '/admin/events'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\EventController::index
 * @see app/Http/Controllers/Admin/EventController.php:13
 * @route '/admin/events'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\EventController::index
 * @see app/Http/Controllers/Admin/EventController.php:13
 * @route '/admin/events'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\EventController::index
 * @see app/Http/Controllers/Admin/EventController.php:13
 * @route '/admin/events'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\EventController::index
 * @see app/Http/Controllers/Admin/EventController.php:13
 * @route '/admin/events'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Admin\EventController::create
 * @see app/Http/Controllers/Admin/EventController.php:30
 * @route '/admin/events/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/events/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EventController::create
 * @see app/Http/Controllers/Admin/EventController.php:30
 * @route '/admin/events/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EventController::create
 * @see app/Http/Controllers/Admin/EventController.php:30
 * @route '/admin/events/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\EventController::create
 * @see app/Http/Controllers/Admin/EventController.php:30
 * @route '/admin/events/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\EventController::create
 * @see app/Http/Controllers/Admin/EventController.php:30
 * @route '/admin/events/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\EventController::create
 * @see app/Http/Controllers/Admin/EventController.php:30
 * @route '/admin/events/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\EventController::create
 * @see app/Http/Controllers/Admin/EventController.php:30
 * @route '/admin/events/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\Admin\EventController::store
 * @see app/Http/Controllers/Admin/EventController.php:35
 * @route '/admin/events'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/events',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\EventController::store
 * @see app/Http/Controllers/Admin/EventController.php:35
 * @route '/admin/events'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EventController::store
 * @see app/Http/Controllers/Admin/EventController.php:35
 * @route '/admin/events'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\EventController::store
 * @see app/Http/Controllers/Admin/EventController.php:35
 * @route '/admin/events'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\EventController::store
 * @see app/Http/Controllers/Admin/EventController.php:35
 * @route '/admin/events'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\EventController::edit
 * @see app/Http/Controllers/Admin/EventController.php:66
 * @route '/admin/events/{event}/edit'
 */
export const edit = (args: { event: string | { id: string } } | [event: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/events/{event}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EventController::edit
 * @see app/Http/Controllers/Admin/EventController.php:66
 * @route '/admin/events/{event}/edit'
 */
edit.url = (args: { event: string | { id: string } } | [event: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { event: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    event: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event: typeof args.event === 'object'
                ? args.event.id
                : args.event,
                }

    return edit.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EventController::edit
 * @see app/Http/Controllers/Admin/EventController.php:66
 * @route '/admin/events/{event}/edit'
 */
edit.get = (args: { event: string | { id: string } } | [event: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\EventController::edit
 * @see app/Http/Controllers/Admin/EventController.php:66
 * @route '/admin/events/{event}/edit'
 */
edit.head = (args: { event: string | { id: string } } | [event: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\EventController::edit
 * @see app/Http/Controllers/Admin/EventController.php:66
 * @route '/admin/events/{event}/edit'
 */
    const editForm = (args: { event: string | { id: string } } | [event: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\EventController::edit
 * @see app/Http/Controllers/Admin/EventController.php:66
 * @route '/admin/events/{event}/edit'
 */
        editForm.get = (args: { event: string | { id: string } } | [event: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\EventController::edit
 * @see app/Http/Controllers/Admin/EventController.php:66
 * @route '/admin/events/{event}/edit'
 */
        editForm.head = (args: { event: string | { id: string } } | [event: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Admin\EventController::update
 * @see app/Http/Controllers/Admin/EventController.php:81
 * @route '/admin/events/{event}'
 */
export const update = (args: { event: string | { id: string } } | [event: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/events/{event}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\EventController::update
 * @see app/Http/Controllers/Admin/EventController.php:81
 * @route '/admin/events/{event}'
 */
update.url = (args: { event: string | { id: string } } | [event: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { event: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    event: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event: typeof args.event === 'object'
                ? args.event.id
                : args.event,
                }

    return update.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EventController::update
 * @see app/Http/Controllers/Admin/EventController.php:81
 * @route '/admin/events/{event}'
 */
update.put = (args: { event: string | { id: string } } | [event: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\EventController::update
 * @see app/Http/Controllers/Admin/EventController.php:81
 * @route '/admin/events/{event}'
 */
    const updateForm = (args: { event: string | { id: string } } | [event: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\EventController::update
 * @see app/Http/Controllers/Admin/EventController.php:81
 * @route '/admin/events/{event}'
 */
        updateForm.put = (args: { event: string | { id: string } } | [event: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Admin\EventController::destroy
 * @see app/Http/Controllers/Admin/EventController.php:124
 * @route '/admin/events/{event}'
 */
export const destroy = (args: { event: string | { id: string } } | [event: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/events/{event}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\EventController::destroy
 * @see app/Http/Controllers/Admin/EventController.php:124
 * @route '/admin/events/{event}'
 */
destroy.url = (args: { event: string | { id: string } } | [event: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { event: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    event: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event: typeof args.event === 'object'
                ? args.event.id
                : args.event,
                }

    return destroy.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EventController::destroy
 * @see app/Http/Controllers/Admin/EventController.php:124
 * @route '/admin/events/{event}'
 */
destroy.delete = (args: { event: string | { id: string } } | [event: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\EventController::destroy
 * @see app/Http/Controllers/Admin/EventController.php:124
 * @route '/admin/events/{event}'
 */
    const destroyForm = (args: { event: string | { id: string } } | [event: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\EventController::destroy
 * @see app/Http/Controllers/Admin/EventController.php:124
 * @route '/admin/events/{event}'
 */
        destroyForm.delete = (args: { event: string | { id: string } } | [event: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const events = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default events
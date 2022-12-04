const { isPlainObject } = require('is-plain-object')

module.exports = function namespace(options) {
    if (!options)
        throw new Error('You need to specify the builder options/execute function.')

    if (typeof options !== 'function' && !isPlainObject(options))
        throw new Error('Options must be of type object or function.')

    if (typeof options === 'function') {
        if (!!Object.getOwnPropertyDescriptor(options, 'constructor'))
            throw new Error('Execute function shound\'t be a constructor.')

        options = { execute: options }
    }

    options.base ||= '{0}'
    options.root ||= ''
    options.joiner ||= ':'
    options.placeholder ||= '{0}'

    function iterate(path) {
        return new Proxy((...args) => options.execute(options.base.replaceAll(options.placeholder, path), ...args), {
            get(_, prop) {
                return iterate(path + (path.trim().length === 0 ? '' : options.joiner) + prop)
            }
        })
    }

    return iterate(options.root)
}
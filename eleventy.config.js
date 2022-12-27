const navigation = require('@11ty/eleventy-navigation')
const dates = require('./utilities/filters/dates')
const helpers = require('./utilities/filters/helpers')
const instagram = require("./netlify/functions/instagram")
const path = require('path')

module.exports = config => {

    // navigation plugin
    config.addPlugin(navigation)

    // Human readable date for posts
    config.addFilter('dateDisplay', dates.friendly)

    // Timestamp for datetime element
    config.addFilter('timestamp', dates.timestamp)

    // Remove whitespace from a string
    config.addNunjucksFilter('spaceless', helpers.spaceless)

    // Minify our HTML
    config.addTransform('htmlminify', require('./utilities/transforms/htmlminify'))

    // Collections
    config.addCollection('healing', collection => {

        const healing = collection.getFilteredByTag('healing')

        for ( let i = 0; i < healing.length; i++ ) {

            const previous_post = healing[i - 1]
            const next_post = healing[i + 1]

            healing[i].data['previous_post'] = previous_post
            healing[i].data['next_post'] = next_post

        }

        return healing.reverse()

    })

    // Collections
    config.addCollection('travel', collection => {

        const travel = collection.getFilteredByTag('travel')

        for ( let i = 0; i < travel.length; i++ ) {

            const previous_post = travel[i - 1]
            const next_post = travel[i + 1]

            travel[i].data['previous_post'] = previous_post
            travel[i].data['next_post'] = next_post

        }

        return travel.reverse()

    }) 

    // Collections
    config.addCollection('lifestyle', collection => {

        const lifestyle = collection.getFilteredByTag('lifestyle')

        for ( let i = 0; i < lifestyle.length; i++ ) {

            const previous_post = lifestyle[i - 1]
            const next_post = lifestyle[i + 1]

            lifestyle[i].data['previous_post'] = previous_post
            lifestyle[i].data['next_post'] = next_post

        }

        return lifestyle.reverse()

    }) 

    // Categories collection
    config.addCollection('categories', collection => {

        const list = new Set()

        collection.getAll().forEach(item => {

            if (!item.data.tags) return

            item.data.tags
                .filter(category => !['blog', 'all'].includes(category))
                .forEach(category => list.add(category))

        })

        return Array.from(list).sort()

    })

    
    // Layout aliases
    config.addLayoutAlias('base', 'layouts/base.njk')
    config.addLayoutAlias('home', 'layouts/home.njk')
    config.addLayoutAlias('featured', 'layouts/featured.njk')
    config.addLayoutAlias('page', 'layouts/page.njk')
    config.addLayoutAlias('healing', 'layouts/blog-healing.njk')
    config.addLayoutAlias('lifestyle', 'layouts/blog-lifestyle.njk')
    config.addLayoutAlias('travel', 'layouts/blog-travel.njk')
    config.addLayoutAlias('post', 'layouts/post.njk')
    config.addLayoutAlias('contact', 'layouts/contact.njk')
    config.addLayoutAlias('category', 'layouts/category.njk')

    // Include our static assets
    config.addPassthroughCopy('css')
    config.addPassthroughCopy('js')
    config.addPassthroughCopy('images')
    config.addPassthroughCopy('favicon.png')
    config.addPassthroughCopy('favicon.svg')

    return {
        markdownTemplateEngine: 'njk',
        dir: {
            input: 'site',
            output: 'public',
            includes: 'includes',
            data: 'globals'
        }
    }

}

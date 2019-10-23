/*
 * Copyright (c) 2019 Frederik Ar. Mikkelsen
 * Licensed under MIT. See https://github.com/Frederikam/blog/blob/master/LICENSE
 */

const util = require('./util.js');
const fs = require('fs-extra');
const Feed = require('feed').Feed;

exports.buildFeed = function(docs) {
    const feed = new Feed({
        title: "112 Blog",
        description: "112madgamers personal blog",
        id: util.baseUrl,
        link: util.baseUrl,
        language: "en",
        copyright: `Copyright 112madgamer ${new Date().getUTCFullYear()}`,
        generator: "https://github.com/frederikam/blog",
        feedLinks: {
            atom: util.baseUrl + "atom",
            json: util.baseUrl + "json"
        },
        author: {
            name: "112madgamer",
            link: ""
        }
    });

    docs.forEach(d => {
        // noinspection JSCheckFunctionSignatures
        feed.addItem({
            title: d.title,
            id: d.url,
            link: d.url,
            description: d.description,
            date: d.date,
            author: {
                author: d.author,
                link: d.authorUrl !== null ? d.authorUrl : "",
                email: ""
            }
        })
    });

    fs.writeFileSync(util.buildDir + "/atom.xml", feed.atom1());
    fs.writeFileSync(util.buildDir + "/rss.xml", feed.rss2());
    fs.writeFileSync(util.buildDir + "/feed.json", feed.json1());
    console.log("Wrote feeds")
};
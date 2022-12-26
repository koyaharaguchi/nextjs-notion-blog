import { Block, ExtendedRecordMap } from "notion-types";
import { getBlockTitle } from "notion-utils";

async function customizedCodeBlock(block: Block, recordMap: ExtendedRecordMap) {
    const title = getBlockTitle(block, recordMap)
    const githubRegex = new RegExp('^https://raw.githubusercontent.com/.+')
    if (githubRegex.test(title)) {
        try {
            const githubResponse = await fetch(title)
            block.properties.title[0][0] = await githubResponse.text()
        }
        catch (err) {
            console.warn('convert error' + err)
        }
    }
}

export default async function customizedRecordMap(recordMap: ExtendedRecordMap) {
    await Promise.all(Object.keys(recordMap.block).map(async key => {
        const block = recordMap.block[key].value
        console.log(block)
        if (block.type === 'code') {
            await customizedCodeBlock(block, recordMap)
        }
    }))
}
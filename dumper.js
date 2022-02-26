/* eslint-disable */

const fs = require('fs');
const bedrock = require('bedrock-protocol')
const client = bedrock.createClient({
  host: '0.0.0.0',
  port: 19132,
  username: 'testman',
  offline: true
})

client.on('start_game', (packet) => {
    fs.writeFile("item_states.json", JSON.stringify(packet["itemstates"], 0, 4), function (err) {
        if (err) return console.log(err);
        console.log("Wrote item_states.json");
    });
})

client.on('packet', (packet) => {
    if (packet["data"]["name"] == "creative_content") {
        fs.writeFile("creative_content.pk", packet["buffer"], function (err) {
            if (err) return console.log(err);
            console.log("Wrote creative_content.pk");
        });
    } else if (packet["data"]["name"] == "biome_definition_list") {
        fs.writeFile("biome_definition_list.nbt", packet["buffer"].slice(1), function (err) {
            if (err) return console.log(err);
            console.log("Wrote biome_definition_list.nbt");
        });
    } else if (packet["data"]["name"] == "available_entity_identifiers") {
        fs.writeFile("available_entity_identifiers.nbt", packet["buffer"].slice(1), function (err) {
            if (err) return console.log(err);
            console.log("Wrote available_entity_identifiers.nbt");
        });
    }
})

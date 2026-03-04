# KCD2 Potion Calculator - Data Models and Recipes

INGREDIENTS = {
    "ing_belladonna": {"name": "Belladonna"},
    "ing_boars_tusk": {"name": "Boar's Tusk"},
    "ing_comfrey": {"name": "Comfrey"},
    "ing_dandelion": {"name": "Dandelion"},
    "ing_marigold": {"name": "Marigold"},
    "ing_wormwood": {"name": "Wormwood"},
    "ing_sage": {"name": "Sage"},
    "ing_amanita_muscaria": {"name": "Amanita Muscaria"},
    "ing_eyebright": {"name": "Eyebright"},
    "ing_st_johns_wort": {"name": "St. John's Wort"},
    "ing_valerian": {"name": "Valerian"},
    "ing_mint": {"name": "Mint"},
    "ing_nettle": {"name": "Nettle"},
    "ing_thistle": {"name": "Thistle"},
    "ing_charcoal": {"name": "Charcoal"},
    "ing_herb_paris": {"name": "Herb Paris"},
    "ing_poppy": {"name": "Poppy"},
    "ing_elderberry_leaves": {"name": "Elderberry Leaves"},
    "ing_ginger": {"name": "Ginger"},
    "ing_feverfew": {"name": "Feverfew"},
    "ing_chamomile": {"name": "Chamomile"},
    "ing_henbane": {"name": "Henbane"},
    "ing_cobweb": {"name": "Cobweb"},
    "ing_sulphur": {"name": "Sulphur"},
    "ing_saltpetre": {"name": "Saltpetre"},
    "ing_leached_coal": {"name": "Leached Coal"},
}

POTIONS = {
    "potion_aesop": {
        "name": "Aesop",
        "type": "Potion",
        "ingredients": [
            {"ingredient_id": "ing_belladonna", "quantity": 1},
            {"ingredient_id": "ing_boars_tusk", "quantity": 1},
            {"ingredient_id": "ing_comfrey", "quantity": 2},
        ],
    },
    "potion_aqua_vitalis": {
        "name": "Aqua Vitalis",
        "type": "Potion",
        "ingredients": [
            {"ingredient_id": "ing_dandelion", "quantity": 2},
            {"ingredient_id": "ing_marigold", "quantity": 1},
        ],
    },
    "potion_artemisia": {
        "name": "Artemisia",
        "type": "Potion",
        "ingredients": [
            {"ingredient_id": "ing_wormwood", "quantity": 2},
            {"ingredient_id": "ing_sage", "quantity": 1},
        ],
    },
    "potion_bane": {
        "name": "Bane",
        "type": "Poison",
        "ingredients": [
            {"ingredient_id": "ing_wormwood", "quantity": 1},
            {"ingredient_id": "ing_belladonna", "quantity": 2},
            {"ingredient_id": "ing_amanita_muscaria", "quantity": 1},
        ],
    },
    "potion_bowmans_brew": {
        "name": "Bowman's Brew",
        "type": "Potion",
        "ingredients": [
            {"ingredient_id": "ing_eyebright", "quantity": 2},
            {"ingredient_id": "ing_st_johns_wort", "quantity": 1},
        ],
    },
    "potion_bucks_blood": {
        "name": "Buck's Blood",
        "type": "Potion",
        "ingredients": [
            {"ingredient_id": "ing_st_johns_wort", "quantity": 1},
            {"ingredient_id": "ing_dandelion", "quantity": 1},
            {"ingredient_id": "ing_comfrey", "quantity": 1},
        ],
    },
    "potion_chamomile_brew": {
        "name": "Chamomile Brew",
        "type": "Potion",
        "ingredients": [
            {"ingredient_id": "ing_chamomile", "quantity": 2},
            {"ingredient_id": "ing_sage", "quantity": 1},
        ],
    },
    "potion_cockerel": {
        "name": "Cockerel",
        "type": "Potion",
        "ingredients": [
            {"ingredient_id": "ing_valerian", "quantity": 1},
            {"ingredient_id": "ing_mint", "quantity": 2},
        ],
    },
    "potion_digestive": {
        "name": "Digestive Potion",
        "type": "Potion",
        "ingredients": [
            {"ingredient_id": "ing_nettle", "quantity": 1},
            {"ingredient_id": "ing_thistle", "quantity": 2},
            {"ingredient_id": "ing_charcoal", "quantity": 1},
        ],
    },
    "potion_dollmaker": {
        "name": "Dollmaker",
        "type": "Poison",
        "ingredients": [
            {"ingredient_id": "ing_valerian", "quantity": 1},
            {"ingredient_id": "ing_herb_paris", "quantity": 2},
        ],
    },
    "potion_embrocation": {
        "name": "Embrocation",
        "type": "Potion",
        "ingredients": [
            {"ingredient_id": "ing_eyebright", "quantity": 1},
            {"ingredient_id": "ing_poppy", "quantity": 1},
            {"ingredient_id": "ing_valerian", "quantity": 1},
            {"ingredient_id": "ing_boars_tusk", "quantity": 1},
        ],
    },
    "potion_fever_tonic": {
        "name": "Fever Tonic",
        "type": "Potion",
        "ingredients": [
            {"ingredient_id": "ing_feverfew", "quantity": 3},
            {"ingredient_id": "ing_ginger", "quantity": 2},
            {"ingredient_id": "ing_elderberry_leaves", "quantity": 1},
        ],
    },
    "potion_fox": {
        "name": "Fox",
        "type": "Potion",
        "ingredients": [
            {"ingredient_id": "ing_nettle", "quantity": 1},
            {"ingredient_id": "ing_st_johns_wort", "quantity": 1},
            {"ingredient_id": "ing_belladonna", "quantity": 1},
            {"ingredient_id": "ing_charcoal", "quantity": 1},
        ],
    },
    "potion_hair_of_the_dog": {
        "name": "Hair O' The Dog",
        "type": "Potion",
        "ingredients": [
            {"ingredient_id": "ing_sage", "quantity": 1},
            {"ingredient_id": "ing_st_johns_wort", "quantity": 1},
            {"ingredient_id": "ing_mint", "quantity": 1},
        ],
    },
    "potion_lethean_water": {
        "name": "Lethean Water",
        "type": "Potion",
        "ingredients": [
            {"ingredient_id": "ing_wormwood", "quantity": 2},
            {"ingredient_id": "ing_belladonna", "quantity": 1},
            {"ingredient_id": "ing_henbane", "quantity": 1},
        ],
    },
    "potion_lion": {
        "name": "Lion",
        "type": "Perfume",
        "ingredients": [
            {"ingredient_id": "ing_sage", "quantity": 2},
            {"ingredient_id": "ing_mint", "quantity": 2},
        ],
    },
    "potion_lullaby": {
        "name": "Lullaby",
        "type": "Poison",
        "ingredients": [
            {"ingredient_id": "ing_poppy", "quantity": 1},
            {"ingredient_id": "ing_herb_paris", "quantity": 1},
            {"ingredient_id": "ing_thistle", "quantity": 1},
        ],
    },
    "potion_marigold_decoction": {
        "name": "Marigold Decoction",
        "type": "Potion",
        "ingredients": [
            {"ingredient_id": "ing_nettle", "quantity": 1},
            {"ingredient_id": "ing_marigold", "quantity": 2},
        ],
    },
    "potion_mintha": {
        "name": "Mintha",
        "type": "Perfume",
        "ingredients": [
            {"ingredient_id": "ing_dandelion", "quantity": 3},
            {"ingredient_id": "ing_marigold", "quantity": 1},
            {"ingredient_id": "ing_mint", "quantity": 1},
        ],
    },
    "potion_moonshine": {
        "name": "Moonshine",
        "type": "Other",
        "ingredients": [
            {"ingredient_id": "ing_mint", "quantity": 2},
            {"ingredient_id": "ing_wormwood", "quantity": 2},
        ],
    },
    "potion_nighthawk": {
        "name": "Nighthawk",
        "type": "Potion",
        "ingredients": [
            {"ingredient_id": "ing_eyebright", "quantity": 2},
            {"ingredient_id": "ing_belladonna", "quantity": 1},
            {"ingredient_id": "ing_chamomile", "quantity": 1},
        ],
    },
    "potion_painkiller_brew": {
        "name": "Painkiller Brew",
        "type": "Potion",
        "ingredients": [
            {"ingredient_id": "ing_poppy", "quantity": 3},
            {"ingredient_id": "ing_comfrey", "quantity": 1},
            {"ingredient_id": "ing_marigold", "quantity": 1},
        ],
    },
    "potion_quickfinger": {
        "name": "Quickfinger",
        "type": "Potion",
        "ingredients": [
            {"ingredient_id": "ing_eyebright", "quantity": 2},
            {"ingredient_id": "ing_valerian", "quantity": 2},
            {"ingredient_id": "ing_cobweb", "quantity": 1},
        ],
    },
    "potion_saviour_schnapps": {
        "name": "Saviour Schnapps",
        "type": "Potion",
        "ingredients": [
            {"ingredient_id": "ing_nettle", "quantity": 1},
            {"ingredient_id": "ing_belladonna", "quantity": 2},
        ],
    },
    "potion_soap": {
        "name": "Soap",
        "type": "Other",
        "ingredients": [
            {"ingredient_id": "ing_thistle", "quantity": 2},
            {"ingredient_id": "ing_dandelion", "quantity": 1},
            {"ingredient_id": "ing_charcoal", "quantity": 1},
        ],
    },
    "potion_lead_shot_gunpowder": {
        "name": "Lead Shot Gunpowder",
        "type": "Gunpowder",
        "ingredients": [
            {"ingredient_id": "ing_sulphur", "quantity": 1},
            {"ingredient_id": "ing_saltpetre", "quantity": 1},
            {"ingredient_id": "ing_charcoal", "quantity": 1},
        ],
    },
    "potion_scattershot_gunpowder": {
        "name": "Scattershot Gunpowder",
        "type": "Gunpowder",
        "ingredients": [
            {"ingredient_id": "ing_sulphur", "quantity": 1},
            {"ingredient_id": "ing_saltpetre", "quantity": 1},
            {"ingredient_id": "ing_leached_coal", "quantity": 1},
        ],
    },
}

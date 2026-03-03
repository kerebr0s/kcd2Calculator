# Potion Crafting Application — Copilot Instructions

## Purpose
This document serves as the authoritative reference for the potion-crafting web application. It defines:
1. How many of each potion can be created from a given list of available ingredients.
2. How many of each ingredient is needed to produce a requested number of potions.

## Important Note on Batch Sizes
The ingredient quantities listed for each potion refer to quantities needed for **one successful batch**. The number of potions produced per batch (batch size/yield) can vary based on strength level and other factors and will be modeled in a future iteration. For now, all calculations assume one potion per successful batch unless otherwise specified.

---

## Data Models

### Ingredient
```
{
  "id": string,              // Unique identifier (e.g., "ing_belladonna")
  "name": string,            // Display name (e.g., "Belladonna")
  "unit": string             // Measurement unit (e.g., "piece", "unit", "quantity")
}
```

### Liquid Base
```
{
  "id": string,              // Unique identifier (e.g., "base_spiritus")
  "name": string             // Display name (e.g., "Spiritus", "Water", "Wine", "Oil")
}
```

### Potion Strength Outcome
```
{
  "strength": string,        // One of: "Weak", "Normal", "Strong", "Henry"
  "effect": string,          // Description of the effect at this strength level
  "notes": string (optional) // Additional notes (e.g., side effects)
}
```

### Potion
```
{
  "id": string,              // Unique identifier (e.g., "potion_aesop")
  "name": string,            // Display name (e.g., "Aesop")
  "description": string,     // Optional flavor text or brief description
  "type": string,            // Category: "Potion", "Perfume", "Poison", "Gunpowder", "Other"
  "liquid_base": string,     // ID of the liquid base
  "ingredients": [           // List of required ingredients per batch
    {
      "ingredient_id": string,
      "quantity": number     // Quantity required (e.g., 1, 2, 3)
    }
  ],
  "recipe_steps": [string],  // Ordered list of recipe steps
  "outcomes": [              // Possible outcomes based on strength
    {
      "strength": string,    // "Weak", "Normal", "Strong", "Henry"
      "effect": string
    }
  ]
}
```

---

## Complete Ingredient List

| ID | Name | Unit |
|---|---|---|
| ing_belladonna | Belladonna | piece |
| ing_boars_tusk | Boar's Tusk | piece |
| ing_comfrey | Comfrey | piece |
| ing_dandelion | Dandelion | piece |
| ing_marigold | Marigold | piece |
| ing_wormwood | Wormwood | piece |
| ing_sage | Sage | piece |
| ing_amanita_muscaria | Amanita Muscaria | piece |
| ing_eyebright | Eyebright | piece |
| ing_st_johns_wort | St. John's Wort | piece |
| ing_valerian | Valerian | piece |
| ing_mint | Mint | piece |
| ing_nettle | Nettle | piece |
| ing_thistle | Thistle | piece |
| ing_charcoal | Charcoal | piece |
| ing_herb_paris | Herb Paris | piece |
| ing_poppy | Poppy | piece |
| ing_elderberry_leaves | Elderberry Leaves | piece |
| ing_ginger | Ginger | piece |
| ing_feverfew | Feverfew | piece |
| ing_chamomile | Chamomile | piece |
| ing_henbane | Henbane | piece |
| ing_cobweb | Cobweb | piece |
| ing_sulphur | Sulphur | piece |
| ing_saltpetre | Saltpetre | piece |
| ing_leached_coal | Leached Coal | piece |

---

## Complete Liquid Base List

| ID | Name |
|---|---|
| base_spiritus | Spiritus |
| base_water | Water |
| base_wine | Wine |
| base_oil | Oil |

---

## Complete Potion Recipes

### Aesop
- **ID:** potion_aesop
- **Type:** Potion
- **Liquid Base:** Spiritus
- **Ingredients:**
  - Belladonna: 1
  - Boar's Tusk: 1
  - Comfrey: 2
- **Recipe Steps:**
  1. Prepare 1x Belladonna, 1x Boar's Tusk, and 2x Comfrey.
  2. Add Spirits to the cauldron.
  3. Grind the Comfrey and add it to the cauldron.
  4. Add the Boar's Tusk to the cauldron and boil for 2 turns.
  5. Grind the Belladonna and add it to the cauldron.
  6. Finally, distil.
- **Outcomes:**
  - Weak: Increases Horsemanship and Houndmaster by 3 for a quarter of a day. Animals will take less notice of you.
  - Normal: Increases Horsemanship and Houndmaster by 3 for half a day. Animals will take less notice of you.
  - Strong: Increases Horsemanship and Houndmaster by 5 for half a day. Animals will take less notice of you. Dogs won't notice you at all.
  - Henry: Increases Horsemanship and Houndmaster by 7 for one day. Animals will take less notice of you. Dogs won't notice you at all.

### Aqua Vitalis
- **ID:** potion_aqua_vitalis
- **Type:** Potion
- **Liquid Base:** Water
- **Ingredients:**
  - Dandelion: 2
  - Marigold: 1
- **Recipe Steps:**
  1. Prepare 2x Dandelion and 1x Marigold.
  2. Add Water to the cauldron.
  3. Add the Dandelion to the cauldron and boil for 1 turn.
  4. Grind the Marigold and add it to the cauldron.
  5. Boil for 2 turns.
  6. Finally, distil.
- **Outcomes:**
  - Weak: You lose 15% less Health for 5 minutes.
  - Normal: You lose 15% less Health and slows bleeding by 10%. Lasts 10 minutes.
  - Strong: You lose 50% less Health and slows bleeding by 50%. Lasts 10 minutes.
  - Henry: You lose 60% less Health and bleed 60% slower for 15 minutes.

### Artemisia
- **ID:** potion_artemisia
- **Type:** Potion
- **Liquid Base:** Spiritus
- **Ingredients:**
  - Wormwood: 2
  - Sage: 1
- **Recipe Steps:**
  1. Prepare 2x Wormwood and 1x Sage.
  2. Add Spirits to the cauldron.
  3. Add the Sage to the cauldron and boil for 1 turn.
  4. Grind the wormwood and add it to the cauldron.
  5. Boil for 2 turns.
  6. Finally, distil.
- **Outcomes:**
  - Weak: Increases Strength by 2 for 10 minutes.
  - Normal: Increases Strength by 4 for 10 minutes.
  - Strong: Increases Strength by 4 and both attack and defence cost 25% less Stamina, lasts 10 minutes.
  - Henry: Increases Strength by 6 and both attack and defence cost 35% less Stamina, lasts 15 minutes.

### Bane (Poison)
- **ID:** potion_bane
- **Type:** Poison
- **Liquid Base:** Wine
- **Ingredients:**
  - Wormwood: 1
  - Belladonna: 2
  - Amanita Muscaria: 1
- **Recipe Steps:**
  1. Prepare 1x Wormwood, 2x Belladonna, and 1x Amanita Muscaria.
  2. Add Wine to the cauldron.
  3. Add the Wormwood to the cauldron and boil for 2 turns.
  4. Grind the Belladonna and add to the cauldron.
  5. Boil for one turn using the Bellows.
  6. Add the Amanita Muscaria to the cauldron.
  7. Finally, distil.
- **Outcomes:**
  - Normal: Makes running impossible and reduces health by 110 in 45 seconds. More suitable for poisoning cooking pots than applying to weapons.
  - Strong: Makes running impossible and reduces health by 110 in 30 seconds. More suitable for poisoning cooking pots than applying to weapons.
  - Henry: Makes running impossible and reduces health by 110 in 15 seconds. More suitable for poisoning cooking pots than applying to weapons.

### Bowman's Brew
- **ID:** potion_bowmans_brew
- **Type:** Potion
- **Liquid Base:** Spiritus
- **Ingredients:**
  - Eyebright: 2
  - St. John's Wort: 1
- **Recipe Steps:**
  1. Prepare 2x Eyebright and 1x St. John's Wort.
  2. Add Spirits to the cauldron.
  3. Add the Eyebright to the cauldron and boil for 3 turns.
  4. Grind the St. John's Wort and add to the cauldron.
  5. Boil for 1 turn using the Bellows.
  6. Finally, distil.
- **Outcomes:**
  - Weak: Increases Marksmanship by 3 for 10 minutes.
  - Normal: Increases Marksmanship by 3 and slows down Stamina loss when aiming by 20% for 10 minutes.
  - Strong: Increases Marksmanship by 5 and slows down Stamina loss when aiming by 50% for 10 minutes.
  - Henry: Increases Marksmanship by 8 and stops Stamina loss when aiming for 15 minutes.

### Buck's Blood
- **ID:** potion_bucks_blood
- **Type:** Potion
- **Liquid Base:** Oil
- **Ingredients:**
  - St. John's Wort: 1
  - Dandelion: 1
  - Comfrey: 1
- **Recipe Steps:**
  1. Prepare 1x St. John's Wort, 1x Dandelion, and 1x Comfrey.
  2. Add Oil to the cauldron.
  3. Grind the St. John's Wort and add it to the cauldron.
  4. Add the Comfrey to the cauldron and boil for 1 turn.
  5. Add the Dandelion to the cauldron and boil for 1 turn using the Bellows.
  6. Finally, pour.
- **Outcomes:**
  - Weak: Increases Stamina by 25% for 20 minutes.
  - Normal: Increases Stamina by 30% for 20 minutes.
  - Strong: Increases Stamina by 30% and Stamina regeneration by 15% for 40 minutes.
  - Henry: Increases Stamina by 60% and Stamina regeneration by 30% for 1 hour.

### Chamomile Brew
- **ID:** potion_chamomile_brew
- **Type:** Potion
- **Liquid Base:** Wine
- **Ingredients:**
  - Chamomile: 2
  - Sage: 1
- **Recipe Steps:**
  1. Prepare 2x Chamomile and 1x Sage.
  2. Add Wine to the cauldron.
  3. Add the Chamomile and boil for 1 turn.
  4. Grind the Sage and add it to the cauldron.
  5. Finally, pour.
- **Outcomes:**
  - Weak: For half a day, sleep will heal you two times faster.
  - Normal: For one day, sleep will heal you three times faster.
  - Strong: For one day, sleep will heal you four times faster and restore Energy two times faster.
  - Henry: For two days, sleep will heal you five times faster and restore Energy three times faster.

### Cockerel
- **ID:** potion_cockerel
- **Type:** Potion
- **Liquid Base:** Spiritus
- **Ingredients:**
  - Valerian: 1
  - Mint: 2
- **Recipe Steps:**
  1. Prepare 1x Valerian and 2x Mint.
  2. Add Spirits to the cauldron.
  3. Grind the Mint and add to the cauldron.
  4. Boil for 1 turn.
  5. Add the Valerian and boil for 2 turns.
  6. Finally, distil.
- **Outcomes:**
  - Weak: Increases Energy by 10.
  - Normal: Increases Energy by 20.
  - Strong: Increases Energy by 20 and Energy decreases 20% slower for half a day.
  - Henry: Increases Energy by 30 and Energy decreases 50% slower for a day.

### Digestive Potion
- **ID:** potion_digestive
- **Type:** Potion
- **Liquid Base:** Water
- **Ingredients:**
  - Nettle: 1
  - Thistle: 2
  - Charcoal: 1
- **Recipe Steps:**
  1. Prepare 1x Nettle, 2x Thistle, and 1x Charcoal.
  2. Add Water to the cauldron.
  3. Add the Thistle to the cauldron and boil for 2 turns.
  4. Grind the Nettle and add it to the cauldron.
  5. Boil for 1 turn.
  6. Grind the Charcoal and add it to the cauldron.
  7. Finally, pour.
- **Outcomes:**
  - Weak: Decreases Nourishment by 20 and cures food poisoning.
  - Normal: Decreases Nourishment by 20, cures poisoning and increases Vitality by 1 for 10 minutes.
  - Strong: Decreases Nourishment by 20, cures poisoning and increases Vitality by 2 for 10 minutes.
  - Henry: Decreases Nourishment by 30, cures poisoning and increases Vitality by 3 for 20 minutes.

### Dollmaker (Poison)
- **ID:** potion_dollmaker
- **Type:** Poison
- **Liquid Base:** Spiritus
- **Ingredients:**
  - Valerian: 1
  - Herb Paris: 2
- **Recipe Steps:**
  1. Prepare 1x Valerian and 2x Herb Paris.
  2. Add Spirits to the cauldron.
  3. Add the Herb Paris to the cauldron and boil for 3 turns.
  4. Grind the Valerian and add it to the cauldron.
  5. Boil for 2 turns.
  6. Finally, distil.
- **Outcomes:**
  - Normal: Makes running impossible and reduces all weapon skills by 3. Gradually reduces Health by 20.
  - Strong: Makes running impossible and reduces all weapon skills by 4. Gradually reduces Health by 30.
  - Henry: Makes running impossible and reduces all weapon skills by 5. Gradually reduces Health by 50.

### Embrocation
- **ID:** potion_embrocation
- **Type:** Potion
- **Liquid Base:** Oil
- **Ingredients:**
  - Eyebright: 1
  - Poppy: 1
  - Valerian: 1
  - Boar's Tusk: 1
- **Recipe Steps:**
  1. Prepare 1x Eyebright, 1x Poppy, 1x Valerian, and 1x Boar's Tusk.
  2. Add Oil to the cauldron.
  3. Add the Poppy and Valerian to the cauldron and boil for 2 turns.
  4. Grind the Eyebright and add it to the cauldron.
  5. Add the Boar's Tusk and boil for 1 turn.
  6. Finally, pour.
- **Outcomes:**
  - Weak: Increases Agility by 2 for 10 minutes.
  - Normal: Increases Agility by 4 and Sprint will cost 10% less Stamina, lasts 10 minutes.
  - Strong: Increases Agility by 4 and Sprint will cost 20% less Stamina, lasts 15 minutes.
  - Henry: Increases Agility by 6 and Sprint will cost 30% less Stamina, lasts 20 minutes.

### Fever Tonic
- **ID:** potion_fever_tonic
- **Type:** Potion
- **Liquid Base:** Wine
- **Ingredients:**
  - Feverfew: 3
  - Ginger: 2
  - Elderberry Leaves: 1
- **Recipe Steps:**
  1. Prepare 3x Feverfew, 2x Ginger, and 1x Elderberry Leaves.
  2. Add Wine to the cauldron.
  3. Add the Feverfew and boil for 2 turns.
  4. Grind the Elderberry Leaves and add them to the cauldron.
  5. Add the Ginger.
  6. Finally, distil.
- **Outcomes:**
  - Normal: Fever and related complications can often lead to death. This tonicum will alleviate fever if given in time.

### Fox
- **ID:** potion_fox
- **Type:** Potion
- **Liquid Base:** Oil
- **Ingredients:**
  - Nettle: 1
  - St. John's Wort: 1
  - Belladonna: 1
  - Charcoal: 1
- **Recipe Steps:**
  1. Prepare 1x Nettle, 1x St. John's Wort, 1x Belladonna, and 1x Charcoal.
  2. Add Oil to the cauldron.
  3. Grind the St. John's Wort and Nettles.
  4. Add them to the cauldron and boil for 2 turns.
  5. Grind the Charcoal and add it to the cauldron.
  6. Add the Belladonna and boil for 1 turn.
  7. Finally, pour.
- **Outcomes:**
  - Weak: Increases Speech by 3 for half a day.
  - Normal: Increases Speech by 3 and increases your reading speed for a day.
  - Strong: Increases Speech by 5 and increases your reading speed for a day.
  - Henry: Increases Speech by 7, increases reading speed and increases the amount of experience gained by 50% for two days.

### Hair O' The Dog
- **ID:** potion_hair_of_the_dog
- **Type:** Potion
- **Liquid Base:** Water
- **Ingredients:**
  - Sage: 1
  - St. John's Wort: 1
  - Mint: 1
- **Recipe Steps:**
  1. Prepare 1x Sage, 1x St. John's Wort, and 1x Mint.
  2. Add Water to the cauldron.
  3. Add the Sage and St. John's Wort to the cauldron.
  4. Boil for 3 turns.
  5. Grind the Mint and add it to the cauldron.
  6. Finally, pour.
- **Outcomes:**
  - Weak: Decreases drunkenness.
  - Normal: Decreases drunkenness or removes hangover.
  - Strong: Eliminates drunkenness and hangover.
  - Henry: Eliminates drunkenness, hangover and temporarily suppresses the effects of alcoholism.

### Lethean Water
- **ID:** potion_lethean_water
- **Type:** Potion
- **Liquid Base:** Spiritus
- **Ingredients:**
  - Wormwood: 2
  - Belladonna: 1
  - Henbane: 1
- **Recipe Steps:**
  1. Prepare 2x Wormwood, 1x Belladonna, and 1x Henbane.
  2. Add Spirits to the cauldron.
  3. Grind the Wormwood and add it to the cauldron.
  4. Add the Belladonna and brew for 3 turns.
  5. Add the Henbane.
  6. Finally, distil.
- **Outcomes:**
  - Normal: Drink one mouthful and you'll forget all earthly experience. Obliterates all perk points, so they can be used elsewhere.

### Lion (Perfume)
- **ID:** potion_lion
- **Type:** Perfume
- **Liquid Base:** Spiritus
- **Ingredients:**
  - Sage: 2
  - Mint: 2
- **Recipe Steps:**
  1. Prepare 2x Sage and 2x Mint.
  2. Add Spirits to the cauldron.
  3. Add the Sage to the cauldron and boil for 2 turns.
  4. Grind the Mint and add it to the cauldron.
  5. Finally, pour.
- **Outcomes:**
  - Weak: Increases Charisma by 3 for 3 minutes. However, if you use it in combination with another perfume, it decreases Charisma by 7.
  - Normal: Increases Charisma by 4 for 4 minutes. However, if you use it in combination with another perfume, it decreases Charisma by 7.
  - Strong: Increases Charisma by 7 for 5 minutes. However, if you use it in combination with another perfume, it decreases Charisma by 7.
  - Henry: Increases Charisma by 10 for 10 minutes. However, if you use it in combination with another perfume, it decreases Charisma by 7.

### Lullaby (Poison)
- **ID:** potion_lullaby
- **Type:** Poison
- **Liquid Base:** Oil
- **Ingredients:**
  - Poppy: 1
  - Herb Paris: 1
  - Thistle: 1
- **Recipe Steps:**
  1. Prepare 1x Poppy, 1x Herb Paris, and 1x Thistle.
  2. Add Oil to the cauldron.
  3. Add the Poppy and boil for 1 turn.
  4. Add the Thistle and boil for 1 turn.
  5. Grind the Herb Paris and add it to the cauldron.
  6. Finally, pour.
- **Outcomes:**
  - Normal: Reduces Energy to 0 and decrease perception. Reduces Stamina and Stamina regeneration by 10% for a quarter of a day.
  - Strong: Reduces Energy to 0 and decrease perception. Reduces Stamina and Stamina regeneration by 30% for half a day.
  - Henry: Reduces Energy to 0 and decrease perception. Reduces Stamina and Stamina regeneration by 50% for a whole day.

### Marigold Decoction
- **ID:** potion_marigold_decoction
- **Type:** Potion
- **Liquid Base:** Water
- **Ingredients:**
  - Nettle: 1
  - Marigold: 2
- **Recipe Steps:**
  1. Prepare 1x Nettle and 2x Marigold.
  2. Add Water to the cauldron.
  3. Add the Nettle to the cauldron and boil for 2 turns.
  4. Grind the Marigold and add it to the cauldron.
  5. Finally, pour.
- **Outcomes:**
  - Weak: Heals 15 health over one minute and hangover passes 50% faster.
  - Normal: Heals 25 health over one minute and hangover passes 100% faster.
  - Strong: Heals 40 health over one minute and instantly cures hangover.
  - Henry: Heals 60 health over one minute and instantly cures hangover.

### Mintha (Perfume)
- **ID:** potion_mintha
- **Type:** Perfume
- **Liquid Base:** Wine
- **Ingredients:**
  - Dandelion: 3
  - Marigold: 1
  - Mint: 1
- **Recipe Steps:**
  1. Prepare 3x Dandelion, 1x Marigold, and 1x Mint.
  2. Add Wine to the cauldron.
  3. Grind the Dandelion and Mint and add them to the cauldron.
  4. Boil for 2 turns.
  5. Add the Marigold to the cauldron and boil for 1 turn using the Bellows.
  6. Finally, distil.
- **Outcomes:**
  - Weak: Increases Charisma by 1 for 20 minutes. However, if you use it in combination with another perfume, it decreases Charisma by 5.
  - Normal: Increases Charisma by 2 for 20 minutes. However, if you use it in combination with another perfume, it decreases Charisma by 5.
  - Strong: Increases Charisma by 3 for 30 minutes. However, if you use it in combination with another perfume, it decreases Charisma by 5.
  - Henry: Increases Charisma by 5 for 40 minutes. However, if you use it in combination with another perfume, it decreases Charisma by 5.

### Moonshine
- **ID:** potion_moonshine
- **Type:** Other
- **Description:** Strong alcoholic drink. Watch out for the hangover!
- **Liquid Base:** Spiritus
- **Ingredients:**
  - Mint: 2
  - Wormwood: 2
- **Recipe Steps:**
  1. Prepare 2x Mint and 2x Wormwood.
  2. Add Spirits to the cauldron.
  3. Add the Wormwood to the cauldron and boil for 2 turns.
  4. Grind the Mint and add it to the cauldron.
  5. Boil for 1 turn.
  6. Finally, distil.
- **Outcomes:**
  - Normal: Strong alcoholic drink with various effects depending on context.

### Nighthawk
- **ID:** potion_nighthawk
- **Type:** Potion
- **Liquid Base:** Water
- **Ingredients:**
  - Eyebright: 2
  - Belladonna: 1
  - Chamomile: 1
- **Recipe Steps:**
  1. Prepare 2x Eyebright, 1x Belladonna, and 1x Chamomile.
  2. Add Water to the cauldron.
  3. Grind the Eyebright and add it to the cauldron.
  4. Add the Belladonna and boil for 3 turns.
  5. Grind the Chamomile and add it to the cauldron.
  6. Finally, pour.
- **Outcomes:**
  - Weak: You will see better in the dark for 10 minutes.
  - Normal: You will see better in the dark and Energy will decrease 25% slower, lasts 15 minutes.
  - Strong: You will see better in the dark and Energy will decrease 50% slower, lasts 20 minutes.
  - Henry: You will see better in the dark and Energy will not decrease at all, lasts 25 minutes.

### Painkiller Brew
- **ID:** potion_painkiller_brew
- **Type:** Potion
- **Liquid Base:** Spiritus
- **Ingredients:**
  - Poppy: 3
  - Comfrey: 1
  - Marigold: 1
- **Recipe Steps:**
  1. Prepare 3x Poppy, 1x Comfrey, and 1x Marigold.
  2. Add Spirits to the cauldron.
  3. Grind the Poppy and add it to the cauldron.
  4. Add the Marigold and boil for 1 turn using the Bellows.
  5. Add the Comfrey and boil for 2 turns.
  6. Finally, distil.
- **Outcomes:**
  - Weak: Suppresses the effects of injury and your maximum Stamina decreases with Health 15% less, lasts 10 minutes.
  - Normal: Suppresses the effects of injury and your maximum Stamina decreases with Health 30% less, lasts 15 minutes.
  - Strong: Suppresses the effects of injury and your maximum Stamina decreases with Health 50% less, lasts 20 minutes.
  - Henry: Suppresses the effects of injury and your maximum Stamina decreases with Health 75% less, lasts 15 minutes.

### Quickfinger
- **ID:** potion_quickfinger
- **Type:** Potion
- **Liquid Base:** Water
- **Ingredients:**
  - Eyebright: 2
  - Valerian: 2
  - Cobweb: 1
- **Recipe Steps:**
  1. Prepare 2x Eyebright, 2x Valerian, and 1x Cobweb.
  2. Add Water to the cauldron.
  3. Add the Cobweb and Eyebright to the cauldron and boil for 3 turns.
  4. Grind the Valerian and add it to the cauldron.
  5. Boil for 1 turn.
  6. Finally, pour.
- **Outcomes:**
  - Weak: Increases Craftsmanship and Thievery by 2 for 20 minutes.
  - Normal: Increases Craftsmanship and Thievery by 4 for 20 minutes.
  - Strong: Increases Craftsmanship and Thievery by 6 for 40 minutes.
  - Henry: Increases Craftsmanship and Thievery by 8 for 1 hour.

### Saviour Schnapps
- **ID:** potion_saviour_schnapps
- **Type:** Potion
- **Liquid Base:** Wine
- **Ingredients:**
  - Nettle: 1
  - Belladonna: 2
- **Recipe Steps:**
  1. Prepare 1x Nettle and 2x Belladonna.
  2. Add Wine to the cauldron.
  3. Add the Nettle to the cauldron and boil for 2 turns.
  4. Grind the Belladonna.
  5. Add the Belladonna to the cauldron and boil for 1 turn.
  6. Finally, pour.
- **Outcomes:**
  - Weak: Saves the game.
  - Normal: Saves the game, heals 10 Health points and increases Strength, Vitality and Agility by 1 for 3 minutes.
  - Strong: Saves the game, heals 20 Health points and increases Strength, Vitality and Agility by 2 for 5 minutes.
  - Henry: Saves the game, heals 30 Health points and increases Strength, Vitality and Agility by 3 for 8 minutes.

### Soap
- **ID:** potion_soap
- **Type:** Other
- **Description:** Soap, a mix of fat, ash, and who knows what else. Combined with water, it works miracles on dirty clothes.
- **Liquid Base:** Oil
- **Ingredients:**
  - Thistle: 2
  - Dandelion: 1
  - Charcoal: 1
- **Recipe Steps:**
  1. Prepare 2x Thistle, 1x Dandelion, and 1x Charcoal.
  2. Add Oil to the cauldron.
  3. Grind the Thistle and add it to the cauldron.
  4. Boil for 2 turns.
  5. Add the Dandelion to the cauldron and boil for 1 turn.
  6. Grind the Charcoal and add it to the cauldron.
  7. Finally, pour.
- **Outcomes:**
  - Normal: A cleaning agent with utility rather than direct combat/alchemy effects.

### Lead Shot Gunpowder
- **ID:** potion_lead_shot_gunpowder
- **Type:** Gunpowder
- **Description:** A lead ball. It rattles a little in the barrel, but at least it's easy to load. Even the best plate armour can't stop it up close!
- **Liquid Base:** Water
- **Ingredients:**
  - Sulphur: 1
  - Saltpetre: 1
  - Charcoal: 1
- **Recipe Steps:**
  1. Prepare 1x Sulphur, 1x Saltpetre, and 1x Charcoal.
  2. Add Water to the cauldron.
  3. Grind the Sulphur and Saltpetre and add it to the cauldron.
  4. Boil for 2 turns.
  5. Grind the Charcoal and add to the cauldron.
  6. Boil for 2 turns.
  7. Pour into a mortar and grind.
- **Outcomes:**
  - Normal: Ammunition with high damage penetration.

### Scattershot Gunpowder
- **ID:** potion_scattershot_gunpowder
- **Type:** Gunpowder
- **Description:** A pile of scrap iron and rocks tied up in a small bag. It'll shred anyone at close range, but at a distance it's rather useless.
- **Liquid Base:** Water
- **Ingredients:**
  - Sulphur: 1
  - Saltpetre: 1
  - Leached Coal: 1
- **Recipe Steps:**
  1. Prepare 1x Sulphur, 1x Saltpetre, and 1x Leached Coal.
  2. Add Water to the cauldron.
  3. Grind the Sulphur and Saltpetre and add them to the cauldron.
  4. Boil for 3 turns.
  5. Grind the Leached Coal and add it to the cauldron.
  6. Boil for 1 turn.
  7. Pour into a mortar and grind.
- **Outcomes:**
  - Normal: Area-of-effect ammunition optimized for close-range combat.

---

## Business Rules and Calculation Logic

### Calculate Potions from Available Ingredients

**Purpose:** Given a set of available ingredients with quantities, determine how many of each potion can be successfully crafted.

**Algorithm:**
1. For each potion recipe:
   - For each required ingredient, calculate: `floor(available_quantity / required_quantity)`
   - The craftable count for that potion is the **minimum** of all per-ingredient quotients.
   - If any required ingredient is missing (quantity = 0) or unavailable, craftable count = 0.
2. Return a dictionary mapping `potion_id` to `{craftable_count, limiting_ingredient_id}` (optional: list limiting ingredients).

**Example:**
- Available: `{ing_sage: 10, ing_mint: 5, ing_wormwood: 8}`
- Potion `lion` requires: Sage 2, Mint 2
- Calculations:
  - Sage: `10 // 2 = 5`
  - Mint: `5 // 2 = 2`
  - Result: `{craftable_count: 2, limiting_ingredient: ing_mint}`

### Calculate Ingredients Required for Requested Potions

**Purpose:** Given a set of requested potions and their quantities, determine the total ingredients needed.

**Algorithm:**
1. For each requested potion and its desired count:
   - For each ingredient in that potion's recipe:
     - Multiply ingredient quantity by potion count.
     - Accumulate totals per ingredient.
2. Return a dictionary mapping `ingredient_id` to `total_quantity_needed`.

**Example:**
- Request: `{potion_lion: 3, potion_mintha: 2}`
- Potion `lion` needs: Sage 2, Mint 2
- Potion `mintha` needs: Dandelion 3, Marigold 1, Mint 1
- Calculations:
  - Sage: `2 × 3 = 6`
  - Mint: `(2 × 3) + (1 × 2) = 8`
  - Dandelion: `3 × 2 = 6`
  - Marigold: `1 × 2 = 2`
- Result: `{ing_sage: 6, ing_mint: 8, ing_dandelion: 6, ing_marigold: 2}`

---

## Validation and Edge Cases

### Unit Consistency
- All ingredients use a common unit: **piece** (discrete count).
- No unit conversion required for initial implementation.
- Future iterations may introduce volume/weight units (ml, g, etc.).

### Quantity Rules
- Quantities must be non-negative numbers.
- Fractional quantities are allowed for **requirements** (e.g., recipes can theoretically require 0.5 of an ingredient).
- Integer division (floor) is used when calculating craftable counts.
- Fractional available quantities result in floor division (e.g., 5.7 available with 2 required = 2 craftable).

### Missing or Unavailable Ingredients
- If an ingredient is missing from the available inventory, treat its quantity as 0.
- A potion is **uncraftable** (craftable_count = 0) if any required ingredient is unavailable.
- Return clear error/warning messages indicating which ingredients are missing.

### Over-Requesting
- If requested potion quantities exceed what can be satisfied:
  - Still calculate and return full requirement totals.
  - It is the **consumer's responsibility** to validate sufficiency or raise alerts.
  - Do not silently cap or modify requests.

### Zero Quantities
- If a potion recipe requires 0 of an ingredient (edge case), skip that ingredient.
- If available quantity is 0 and the recipe doesn't require that ingredient, do not penalize craftable count.

---

## Suggested API / Function Interfaces

```python
def calculate_potions_from_ingredients(
    available: Dict[str, float],
    recipes: Dict[str, Potion]
) -> Dict[str, Dict[str, Any]]:
    """
    Calculate how many of each potion can be crafted from available ingredients.
    
    Args:
        available: Dict of {ingredient_id: quantity_available}
        recipes: Dict of {potion_id: Potion object}
    
    Returns:
        Dict of {potion_id: {craftable_count: int, limiting_ingredient: str}}
    """
    pass

def calculate_ingredients_for_potions(
    requested: Dict[str, int],
    recipes: Dict[str, Potion]
) -> Dict[str, float]:
    """
    Calculate total ingredients needed to craft requested potions.
    
    Args:
        requested: Dict of {potion_id: count_requested}
        recipes: Dict of {potion_id: Potion object}
    
    Returns:
        Dict of {ingredient_id: total_quantity_needed}
    """
    pass

def validate_inventory(
    available: Dict[str, float],
    all_ingredients: Dict[str, Ingredient]
) -> List[str]:
    """
    Validate that all available quantities are non-negative and ingredient IDs exist.
    
    Args:
        available: Dict of {ingredient_id: quantity}
        all_ingredients: Reference dict of all valid ingredients
    
    Returns:
        List of error messages (empty if valid)
    """
    pass
```

---

## Implementation Next Steps

1. **Data Storage:**
   - Serialize all potion and ingredient data to JSON or a lightweight database.
   - Example JSON structure (see `/data/potions.json` and `/data/ingredients.json`).

2. **Core Calculation Functions:**
   - Implement `calculate_potions_from_ingredients()`.
   - Implement `calculate_ingredients_for_potions()`.
   - Add comprehensive unit tests for edge cases.

3. **Web API:**
   - Expose calculations via REST endpoints or GraphQL.
   - Example endpoints:
     - `POST /api/calculate/potions` — accepts available ingredients, returns craftable potions.
     - `POST /api/calculate/ingredients` — accepts requested potions, returns required ingredients.

4. **Frontend:**
   - Build UI forms for:
     - Ingredient inventory input.
     - Potion request input.
     - Display results (craftable potions, required ingredients, shortfalls).

5. **Future Enhancements:**
   - Add batch-size multiplier logic per potion strength/outcome.
   - Introduce unit conversion (g ↔ ml, etc.).
   - Add storage persistence (database).
   - Add procurement/shopping list generation.

---

## Summary

This reference document provides:
- **Complete ingredient and potion lists** with precise recipes, steps, and outcomes.
- **Data model definitions** for integration with code.
- **Calculation algorithms** for both primary use cases.
- **Edge case handling** and validation rules.
- **API surface** suggestions for implementation.

Use this document as the source of truth for all potion-crafting logic and data structures throughout the application.

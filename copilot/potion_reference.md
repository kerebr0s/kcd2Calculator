## Data Models

### Ingredient
```
{
  "id": string,              // Unique identifier (e.g., "ing_belladonna")
  "name": string,            // Display name (e.g., "Belladonna")
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

| ID | Name |
|---|---|
| ing_belladonna | Belladonna |
| ing_boars_tusk | Boar's Tusk |
| ing_comfrey | Comfrey |
| ing_dandelion | Dandelion
| ing_marigold | Marigold |
| ing_wormwood | Wormwood |
| ing_sage | Sage |
| ing_amanita_muscaria | Amanita Muscaria |
| ing_eyebright | Eyebright |
| ing_st_johns_wort | St. John's Wort |
| ing_valerian | Valerian |
| ing_mint | Mint |
| ing_nettle | Nettle |
| ing_thistle | Thistle |
| ing_charcoal | Charcoal |
| ing_herb_paris | Herb Paris |
| ing_poppy | Poppy |
| ing_elderberry_leaves | Elderberry Leaves |
| ing_ginger | Ginger |
| ing_feverfew | Feverfew |
| ing_chamomile | Chamomile |
| ing_henbane | Henbane |
| ing_cobweb | Cobweb |
| ing_sulphur | Sulphur |
| ing_saltpetre | Saltpetre |
| ing_leached_coal | Leached Coal |
| ing_mandrake_root | Mandrake Root |
| ing_freshwater_pearl | Freshwater Pearl |

---

## Complete Liquid Base List

| ID | Name |
|---|---|
| base_spirits | Spirits |
| base_water | Water |
| base_wine | Wine |
| base_oil | Oil |

---

## Important Note on Batch Sizes
The ingredient quantities listed for each potion refer to quantities needed for **one successful batch**. 
The number of potions produced per batch (batch size/yield) can vary based on strength level and other factors and will be modeled in a future iteration.
For now, all calculations assume one potion per successful batch unless otherwise specified.

## Base Game Potion Recipes

### Aesop
- **ID:** potion_aesop
- **Type:** Potion
- **Liquid Base:** Spirits
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
- **Liquid Base:** Spirits
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
- **Liquid Base:** Spirits
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
- **Liquid Base:** Spirits
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
- **Liquid Base:** Spirits
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
- **Liquid Base:** Spirits
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
- **Liquid Base:** Spirits
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
- **Liquid Base:** Spirits
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
- **Liquid Base:** Spirits
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

## DLC Potion Recipes

### Mandrake Decoction
- **ID:** potion_mandrake_decoction
- **Type:** Potion
- **Liquid Base:** Wine
- **Ingredients:**
  - Mandrake Root: 1
  - Sage: 1
  - Freshwater Pearl: 1
- **Recipe Steps:**
  1. Prepare 1x Mandrake Root, 1x Sage, and 1x Freshwater Pearl.
  2. Add Spirits to the cauldron.
  3. Add in the mandrake and boil for 1 turn.
  4. Grind the river pearl and add it to the cauldron.
  5. Boil for 1 turn.
  6. Grind the sage and add to the cauldron.
  7. Using the bellows, boil for 1 turn.
  8. Finally, distil.
- **Outcomes:**
  - Weak: Heals health over a period of time. In better qualities, it increases Vitality and unblocked strikes deplete stamina less.
  - Normal: Heals health over a period of time. In better qualities, it increases Vitality and unblocked strikes deplete stamina less.
  - Strong: Heals health over a period of time. In better qualities, it increases Vitality and unblocked strikes deplete stamina less.
  - Henry: Heals health over a period of time. In better qualities, it increases Vitality and unblocked strikes deplete stamina less.
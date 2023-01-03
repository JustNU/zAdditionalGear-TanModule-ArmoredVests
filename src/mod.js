"use strict";

class Mod
{
	
	postDBLoad(container) 
	{
		// Constants
		const logger = container.resolve("WinstonLogger");
		const database = container.resolve("DatabaseServer").getTables();
		const jsonUtil = container.resolve("JsonUtil");
		const core = container.resolve("JustNUCore");
		const modDb = `user/mods/zAdditionalGear-TanModule-ArmoredVests/db/`;
		const config = require("../config/config.json");
		const itemConfig = require("../config/itemConfig.json");
		const itemData = require("../db/items/itemData.json");
		
		// edge cases
		const edgeCases = ["AddGearTan_GEN4_Light"];
		
		//add retextures
		for (const categoryId in itemConfig) {
			for (const itemId in itemConfig[categoryId]) {
				// skip edge cases, handle them later
				if (edgeCases.includes(itemId)) {
					continue;
				}
				
				if (itemConfig[categoryId][itemId]) {
					core.addItemRetexture(modDb, itemId, itemData[itemId].BaseItemID, itemData[itemId].BundlePath, config.EnableTradeOffers, config.AddToBots, itemData[itemId].LootWeigthMult);
				}
			}
		}
		
		// deal with edge cases
		// GEN4 light
		if (itemConfig["Armored Vests"]["AddGearTan_GEN4_Light"]) {
			core.addItemRetexture(modDb, "AddGearTan_GEN4_Light", itemData["AddGearTan_GEN4_Light"].BaseItemID, itemData["AddGearTan_GEN4_Light"].BundlePath, false, config.AddToBots, itemData["AddGearTan_GEN4_Light"].LootWeigthMult);
			
			// change stats
			const gen4Light = database.templates.items["AddGearTan_GEN4_Light"];
			gen4Light._props.Weight = 10;
			gen4Light._props.Height = 3;
			gen4Light._props.Durability = Math.round(gen4Light._props.MaxDurability - (gen4Light._props.MaxDurability * 0.08));
			gen4Light._props.MaxDurability = Math.round(gen4Light._props.MaxDurability - (gen4Light._props.MaxDurability * 0.08))
			
			if (gen4Light._props.speedPenaltyPercent != 0)
				gen4Light._props.speedPenaltyPercent = gen4Light._props.speedPenaltyPercent + 1;
			if (gen4Light._props.mousePenalty != 0)
				gen4Light._props.mousePenalty = gen4Light._props.mousePenalty + 1;
			if (gen4Light._props.weaponErgonomicPenalty != 0)
				gen4Light._props.weaponErgonomicPenalty = gen4Light._props.weaponErgonomicPenalty + 1;
			
			// change price
			database.templates.prices["AddGearTan_GEN4_Light"] = 85000;
			
			for (const handbookItemIndex in database.templates.handbook.Items) {
				if (database.templates.handbook.Items[handbookItemIndex].Id === "AddGearTan_GEN4_Light") {
					database.templates.handbook.Items[handbookItemIndex].Price = 85000;
					break;
				}
			}
			
			// add trade offer
			if (config.EnableTradeOffers)
				core.createTraderOffer("AddGearTan_GEN4_Light", "5ac3b934156ae10c4430e83c", "5449016a4bdc2d6f028b456f", 90222, 3)
		}
		
		// Modify quests
		if (config.EnableQuestChanges) {
			const armoredVests = [
				["AddGearTan_GEN4_Full"],
				["AddGearTan_GEN4_Assault"],
				["AddGearTan_GEN4_Mobility"],
				["AddGearTan_6B13"],
				["AddGearTan_Hexgrid"],
				["AddGearTan_UntarVest"],
				["AddGearTan_Trooper"],
				["AddGearTan_Trooper_Clean"],
				["AddGearTan_PACA"],
				["AddGearTan_6B2"],
				["AddGearTan_GEN4_Light"]
			];
				
			const punisher5Gear = [
				["AddGearTan_PACA", "5aa7cfc0e5b5b00015693143"],
				["AddGearTan_PACA", "5a7c4850e899ef00150be885"],
				["AddGearTan_PACA", "AddGearBlack_6b47covered_black"],
				["AddGearTan_PACA", "AddGearTan_6B47"]
			];
			
			// The survivalist path. Unprotected, but dangerous
			if (database.templates.quests["5d25aed386f77442734d25d2"]) {
				const unprotectedButDangerousGear = database.templates.quests["5d25aed386f77442734d25d2"].conditions.AvailableForFinish[0]._props.counter.conditions[1]._props.equipmentExclusive;
				
				database.templates.quests["5d25aed386f77442734d25d2"].conditions.AvailableForFinish[0]._props.counter.conditions[1]._props.equipmentExclusive = [
					...jsonUtil.clone(unprotectedButDangerousGear),
					...armoredVests
				];
			}
			
			// The Punisher - Part 5
			if (database.templates.quests["59ca29fb86f77445ab465c87"]) {
				const thePunisher5Gear = database.templates.quests["59ca29fb86f77445ab465c87"].conditions.AvailableForFinish[6]._props.counter.conditions[1]._props.equipmentInclusive;
				
				database.templates.quests["59ca29fb86f77445ab465c87"].conditions.AvailableForFinish[6]._props.counter.conditions[1]._props.equipmentInclusive = [
					...jsonUtil.clone(thePunisher5Gear),
					...punisher5Gear
				];
			}
			
			// Swift one
			if (database.templates.quests["60e729cf5698ee7b05057439"]) {
				const swiftOneGear = database.templates.quests["60e729cf5698ee7b05057439"].conditions.AvailableForFinish[0]._props.counter.conditions[1]._props.equipmentExclusive;
				
				database.templates.quests["60e729cf5698ee7b05057439"].conditions.AvailableForFinish[0]._props.counter.conditions[1]._props.equipmentExclusive = [
					...jsonUtil.clone(swiftOneGear),
					...armoredVests
				];
			}
		}
	}
}

module.exports = { mod: new Mod() }
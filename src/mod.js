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
		
		//add retextures
		for (const categoryId in itemConfig) {
			for (const itemId in itemConfig[categoryId]) {
				if (itemConfig[categoryId][itemId]) {
					core.addItemRetexture(modDb, itemId, itemData[itemId].BaseItemID, itemData[itemId].BundlePath, config.EnableTradeOffers, config.AddToBots);
				}
			}
		}
		
		// deal with edge cases
		
		// debug
		const debug = true;
		
		if (debug) {
			for (const item in database.templates.items) {
				database.templates.items[item]._props.ExaminedByDefault = true;
			}
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
				["AddGearTan_6B2"]
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
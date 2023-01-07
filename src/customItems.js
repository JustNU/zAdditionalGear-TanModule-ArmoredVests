"use strict";

class CustomItems {
	static handleCustomItems(database, core, config, itemConfig, itemData)
	{
		if (itemConfig["Armored Vests"]["AddGearTan_GEN4_Light"]) {
			core.addItemRetexture("AddGearTan_GEN4_Light", itemData["AddGearTan_GEN4_Light"].BaseItemID, itemData["AddGearTan_GEN4_Light"].BundlePath, false, config.AddToBots, itemData["AddGearTan_GEN4_Light"].LootWeigthMult);
			const dbItem = database.templates.items["AddGearTan_GEN4_Light"];
			
			// change weight
			if (dbItem._props.Weight > 0)
				dbItem._props.Weight = dbItem._props.Weight - 1; // 12
			
			// change inventory space
			if (dbItem._props.Width != 1 && dbItem._props.Height != 1) {
				dbItem._props.Height = 3;
				dbItem._props.Width = 3;
			}
			
			// change durability
			dbItem._props.Durability = Math.round(dbItem._props.MaxDurability - (dbItem._props.MaxDurability * 0.08)); // 60
			dbItem._props.MaxDurability = Math.round(dbItem._props.MaxDurability - (dbItem._props.MaxDurability * 0.08)); // 60
			
			// change debuffs
			dbItem._props.speedPenaltyPercent = Math.round(dbItem._props.speedPenaltyPercent - (dbItem._props.speedPenaltyPercent * 0.10)); // -10
			dbItem._props.mousePenalty = Math.round(dbItem._props.mousePenalty - (dbItem._props.mousePenalty * 0.23)); // -13
			dbItem._props.weaponErgonomicPenalty = Math.round(dbItem._props.weaponErgonomicPenalty - (dbItem._props.weaponErgonomicPenalty * 0.08)); // -11
			
			// find handbook entry
			const dbItemHandbook = database.templates.handbook.Items.find((item) => {return item.Id === "AddGearTan_GEN4_Light"});
			
			// change handbook price
			dbItemHandbook.Price = Math.round(dbItemHandbook.Price - (dbItemHandbook.Price * 0.20)); // 95019
			
			// change flea price (if it has one)
			if (database.templates.prices["AddGearTan_GEN4_Light"])
				database.templates.prices["AddGearTan_GEN4_Light"] = dbItemHandbook.Price;
			
			// add trade offer
			if (config.EnableTradeOffers)
				core.createTraderOffer("AddGearTan_GEN4_Light", "5ac3b934156ae10c4430e83c", "5449016a4bdc2d6f028b456f", dbItemHandbook.Price, 4);
		}
		
		if (itemConfig["Armored Vests"]["AddGearTan_ANA_M2_Armor"]) {
			core.addItemRetexture("AddGearTan_ANA_M2_Armor", itemData["AddGearTan_ANA_M2_Armor"].BaseItemID, itemData["AddGearTan_ANA_M2_Armor"].BundlePath, false, config.AddToBots, itemData["AddGearTan_ANA_M2_Armor"].LootWeigthMult);
			const dbItem = database.templates.items["AddGearTan_ANA_M2_Armor"];
			const rigItem = database.templates.items["5ab8dced86f774646209ec87"];
			
			// change weight
			if (rigItem._props.Weight > 0) {
				dbItem._props.Weight = rigItem._props.Weight - 1; // 6
			} else {
				dbItem._props.Weight = rigItem._props.Weight;
			}
			
			// change inventory space
			if (rigItem._props.Width != 1 && rigItem._props.Height != 1) {
				dbItem._props.Width = 3;
				dbItem._props.Height = 3;
			} else {
				dbItem._props.Width = rigItem._props.Width;
				dbItem._props.Height = rigItem._props.Height;
			}
			
			// same stats as rig
			dbItem._props.RepairCost = rigItem._props.RepairCost;
			dbItem._props.CanSellOnRagfair = rigItem._props.CanSellOnRagfair;
			dbItem._props.Durability = rigItem._props.Durability;
			dbItem._props.MaxDurability = rigItem._props.MaxDurability;
			dbItem._props.armorZone = rigItem._props.armorZone;
			dbItem._props.armorClass = rigItem._props.armorClass;
			dbItem._props.BluntThroughput = rigItem._props.BluntThroughput;
			dbItem._props.ArmorMaterial = rigItem._props.ArmorMaterial;
			dbItem._props.ArmorType = rigItem._props.ArmorType;
			dbItem._props.Indestructibility = rigItem._props.Indestructibility;
			dbItem._props.MaterialType = rigItem._props.MaterialType;
			
			// change debuffs
			dbItem._props.speedPenaltyPercent = Math.round(rigItem._props.speedPenaltyPercent - (rigItem._props.speedPenaltyPercent * 0.25)); // -6
			dbItem._props.mousePenalty = rigItem._props.mousePenalty;
			dbItem._props.weaponErgonomicPenalty =  Math.round(rigItem._props.weaponErgonomicPenalty - (rigItem._props.weaponErgonomicPenalty * 0.50)); // -1
			
			// find handbook entry
			const dbItemHandbook = database.templates.handbook.Items.find((item) => {return item.Id === "AddGearTan_ANA_M2_Armor"});
			const rigHandbookEntry = database.templates.handbook.Items.find((item) => {return item.Id === "5ab8dced86f774646209ec87"});
			
			// change handbook price
			dbItemHandbook.Price = Math.round(rigHandbookEntry.Price - (rigHandbookEntry.Price * 0.10)); // 61819
			
			// change flea price (if it has one)
			if (database.templates.prices["AddGearTan_ANA_M2_Armor"])
				database.templates.prices["AddGearTan_ANA_M2_Armor"] = dbItemHandbook.Price;
			
			// add trade offer
			if (config.EnableTradeOffers)
				core.createTraderOffer("AddGearTan_ANA_M2_Armor", "5ac3b934156ae10c4430e83c", "5449016a4bdc2d6f028b456f", dbItemHandbook.Price, 3);
		}
	}
}

module.exports = CustomItems;
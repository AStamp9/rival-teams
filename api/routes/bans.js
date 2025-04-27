const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile.js')["development"]);

router.get('/bans', (req, res) => {
    knex('bans')
        .select('*')
        .then(data => res.json(data))
        .catch(error => {
            console.error("Failed to get bans", error);
            res.status(500).json({ error: "Something went wrong" });
        });
});

router.get('/bans/team_comp/:team_comp_id', (req, res) => {
    const { team_comp_id } = req.params;

    knex('bans')
        .where({ team_comps_id: team_comp_id })
        .first()
        .then(data => {
            if (!data) {
                res.status(404).json({ error: "Ban entry not found" });
            } else {
                res.json(data);
            }
        })
        .catch(error => {
            console.error("Failed to get ban for team_comp", error);
            res.status(500).json({ error: "Something went wrong" });
        });
});

router.post('/bans', async (req, res) => {
    const { team_comps_id, ban_character_1_id, ban_character_2_id } = req.body;

    if (!team_comps_id || !ban_character_1_id || !ban_character_2_id) {
        return res.status(400).json({ error: "All fields are required" });
    }

    if (ban_character_1_id === ban_character_2_id) {
        return res.status(400).json({ error: "Banned characters must be different" });
    }

    try {
        // Validate characters exist
        const characters = await knex('characters')
            .whereIn('id', [ban_character_1_id, ban_character_2_id]);

        if (characters.length !== 2) {
            return res.status(400).json({ error: "One or both banned characters do not exist" });
        }

        // Validate team comp exists
        const teamComp = await knex('team_comps')
            .where({ id: team_comps_id })
            .first();

        if (!teamComp) {
            return res.status(404).json({ error: "Team composition not found" });
        }

        // Check if banned characters are in the team comp
        const usedCharacters = [
            teamComp.character_1_id,
            teamComp.character_2_id,
            teamComp.character_3_id,
            teamComp.character_4_id,
            teamComp.character_5_id,
            teamComp.character_6_id
        ];

        if (usedCharacters.includes(ban_character_1_id) || usedCharacters.includes(ban_character_2_id)) {
            return res.status(400).json({ error: "Cannot ban characters that are part of the team composition" });
        }

        const [id] = await knex('bans')
            .insert({ team_comps_id, ban_character_1_id, ban_character_2_id })
            .returning('id');

        res.status(201).json({ success: true, id, message: "Ban created" });

    } catch (error) {
        console.error("Failed to create ban", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

router.patch('/bans/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { ban_character_1_id, ban_character_2_id } = req.body;

    if (ban_character_1_id && ban_character_1_id === ban_character_2_id) {
        return res.status(400).json({ error: "Banned characters must be different" });
    }

    const updateData = {
        ...(ban_character_1_id && { ban_character_1_id }),
        ...(ban_character_2_id && { ban_character_2_id }),
    };

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: "No fields to update" });
    }

    try {
        const existingBan = await knex('bans')
            .where({ id })
            .first();

        if (!existingBan) {
            return res.status(404).json({ error: "Ban entry not found" });
        }

        const teamComp = await knex('team_comps')
            .where({ id: existingBan.team_comps_id })
            .first();

        const usedCharacters = [
            teamComp.character_1_id,
            teamComp.character_2_id,
            teamComp.character_3_id,
            teamComp.character_4_id,
            teamComp.character_5_id,
            teamComp.character_6_id
        ];

        if (
            (updateData.ban_character_1_id && usedCharacters.includes(updateData.ban_character_1_id)) ||
            (updateData.ban_character_2_id && usedCharacters.includes(updateData.ban_character_2_id))
        ) {
            return res.status(400).json({ error: "Cannot ban characters in the team composition" });
        }

        const validCharacterIds = await knex('characters')
            .whereIn('id', Object.values(updateData))
            .select('id');

        if (validCharacterIds.length !== Object.values(updateData).length) {
            return res.status(400).json({ error: "One or both banned characters do not exist" });
        }

        await knex('bans')
            .where({ id })
            .update(updateData);

        res.json({ success: true, message: "Ban updated" });

    } catch (error) {
        console.error("Failed to update ban", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

router.delete('/bans/:id', (req, res) => {
    const id = parseInt(req.params.id);

    knex('bans')
        .where({ id })
        .del()
        .then(count => {
            if (count === 0) {
                res.status(404).json({ error: "Ban entry not found" });
            } else {
                res.status(200).json({ success: true, message: "Ban deleted" });
            }
        })
        .catch(error => {
            console.error("Failed to delete ban", error);
            res.status(500).json({ error: "Something went wrong" });
        });
});

module.exports = router;
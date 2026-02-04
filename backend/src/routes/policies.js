import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const {
      assured, address, coc_number, or_number, policy_number, policy_type,
      policy_year, date_issued, date_received, insurance_from_date, insurance_to_date,
      model, make, body_type, color, mv_file_no, plate_no, chassis_no, motor_no,
      premium, other_charges, auth_fee
    } = req.body;

    // Validate required fields
    if (!assured || !coc_number || !or_number) {
      return res.status(400).json({
        success: false,
        message: 'Required fields missing: assured, coc_number, or_number'
      });
    }

    // Calculate rates
    const premiumNum = parseFloat(premium) || 0;
    const otherChargesNum = parseFloat(other_charges) || 0;
    const authFeeNum = parseFloat(auth_fee) || 50.40;
    
    const docStamps = premiumNum * 0.125;
    const eVat = premiumNum * 0.12;
    const lgt = premiumNum * 0.005;
    const totalPremium = premiumNum + otherChargesNum + docStamps + eVat + lgt + authFeeNum;

    const [result] = await pool.query(
      `INSERT INTO insurance_policies (
        assured, address, coc_number, or_number, policy_number, policy_type, 
        policy_year, date_issued, date_received, insurance_from_date, insurance_to_date,
        model, make, body_type, color, mv_file_no, plate_no, chassis_no, motor_no,
        premium, other_charges, auth_fee, doc_stamps, e_vat, lgt, total_premium
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        assured, address, coc_number, or_number, policy_number, policy_type,
        policy_year, date_issued, date_received, insurance_from_date, insurance_to_date,
        model, make, body_type, color, mv_file_no, plate_no, chassis_no, motor_no,
        premiumNum, otherChargesNum, authFeeNum, docStamps, eVat, lgt, totalPremium
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Policy created successfully',
      policyId: result.insertId
    });
  } catch (error) {
    console.error('Error creating policy:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating policy',
      error: error.message
    });
  }
});

// READ - Get all policies
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM insurance_policies WHERE is_deleted = FALSE ORDER BY created_at DESC`
    );
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching policies:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching policies',
      error: error.message
    });
  }
});

// READ - Get single policy by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM insurance_policies WHERE id = ? AND is_deleted = FALSE ', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Policy not found'
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error fetching policy:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching policy',
      error: error.message
    });
  }
});

// UPDATE - Update existing policy
router.put('/:id', async (req, res) => {
  try {
    // Handle both snake_case (from frontend) and camelCase (legacy)
    const {
      assured, address, coc_number, or_number, policy_number, policy_type,
      policy_year, date_issued, date_received, insurance_from_date, insurance_to_date,
      model, make, body_type, color, mv_file_no, plate_no, chassis_no, motor_no,
      premium, other_charges, doc_stamps, e_vat, lgt, auth_fee, total_premium
    } = req.body;

    // Validate required fields
    if (!assured || !coc_number || !or_number) {
      return res.status(400).json({
        success: false,
        message: 'Error updating policy',
        error: 'Required fields missing: assured, coc_number, or_number'
      });
    }

    const [result] = await pool.query(
      `UPDATE insurance_policies SET
        assured = ?, address = ?, coc_number = ?, or_number = ?, policy_number = ?,
        policy_type = ?, policy_year = ?, date_issued = ?, date_received = ?,
        insurance_from_date = ?, insurance_to_date = ?, model = ?, make = ?,
        body_type = ?, color = ?, mv_file_no = ?, plate_no = ?, chassis_no = ?,
        motor_no = ?, premium = ?, other_charges = ?, auth_fee = ?,
        doc_stamps = ?, e_vat = ?, lgt = ?, total_premium = ?
      WHERE id = ?`,
      [
        assured, address, coc_number, or_number, policy_number, policy_type,
        policy_year, date_issued, date_received, insurance_from_date, insurance_to_date,
        model, make, body_type, color, mv_file_no, plate_no, chassis_no, motor_no,
        parseFloat(premium) || 0, parseFloat(other_charges) || 0, parseFloat(auth_fee) || 50.40,
        parseFloat(doc_stamps) || 0, parseFloat(e_vat) || 0, parseFloat(lgt) || 0,
        parseFloat(total_premium) || 0,
        req.params.id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Policy not found'
      });
    }

    res.json({
      success: true,
      message: 'Policy updated successfully'
    });
  } catch (error) {
    console.error('Error updating policy:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating policy',
      error: error.message
    });
  }
});

// DELETE - Delete policy
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query(
      `UPDATE insurance_policies SET is_deleted = TRUE, deleted_at = NOW() WHERE id = ?`,
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Policy not found'
      });
    }

    res.json({
      success: true,
      message: 'Policy deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting policy:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting policy',
      error: error.message
    });
  }
});

router.get('/deleted/list', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM insurance_policies WHERE is_deleted = TRUE ORDER BY deleted_at DESC`
    );
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching deleted policies:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching deleted policies',
      error: error.message
    });
  }
});

router.put('/:id/restore', async (req, res) => {
  try {
    const [result] = await pool.query(
      `UPDATE insurance_policies SET is_deleted = FALSE, deleted_at = NULL WHERE id = ?`,
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Policy not found'
      });
    }

    res.json({
      success: true,
      message: 'Policy restored successfully'
    });
  } catch (error) {
    console.error('Error restoring policy:', error);
    res.status(500).json({
      success: false,
      message: 'Error restoring policy',
      error: error.message
    });
  }
});

export default router;
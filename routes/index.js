const mon = require('../modules/mongoose');

const date ={
  date: async function (req, res) {
  
      try {
        const currentDate = new Date();
       
        const dat = { ...req.body, currentDate };
        console.log(dat);
    
        // Extract and convert values     
        const { name, totalamount, interest, months } = dat;
        const totalAmount = parseFloat(totalamount);
        const interestRate = parseFloat(interest);
        const numMonths = parseInt(months, 10);
    
        // Validate inputs
        if (isNaN(totalAmount) || isNaN(interestRate) || isNaN(numMonths)) {
          return res.status(400).send("Invalid input values for total amount, interest, or months");
        }
    
        // Calculate vatti and other values
        const vatti = (totalAmount * interestRate) / 100;
        const totalVatti = vatti * numMonths;
        const updatedTotalAmount = totalAmount + totalVatti;
        const monthlyPay = updatedTotalAmount / numMonths;
    
        console.log({ totalAmount, interestRate, numMonths, vatti, totalVatti, updatedTotalAmount, monthlyPay });
    
        const full ={
          name,
          totalamount: updatedTotalAmount,
          interest: interestRate,
          months: numMonths,
          totalVatti,
          monthlypay: monthlyPay,
          currentDate
        };
      await mon.date(dat);
      const result = await mon.full(full);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  
  
dateget: async function (req, res) {
  try {
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    const result = await mon.dateget(startDate,endDate ); 
    console.log(result);                                            
    return res.status(200).json(result);
  } catch (err) {
      return res.send(err);
  }
},
pill: async function (req, res) {
  try {
    const id = req.body.id;
     console.log(id); 
    const result = await mon.pill(id); 
    console.log(result);
    return result==='false'?(res.status(404).json({result:'not register'})):( res.status(200).json({result:'success',result}));  
                                
  } catch (err) {
      return res.send(err);
  }
},

pay: async function (req, res) {
  try {
    const id=req.body.id;
    const pay=parseInt(req.body.pay);
    const result = await mon.pay(id,pay); 
    // console.log(result);
    return res.status(200).json(result);
                                
  } catch (err) {
      return res.send(err);
  }
},

pill_status: async function (req, res) {
  try {
    const id=req.body.id;
    const status=req.body.status;
    const result = await mon.pill_status(id, status); 
    // console.log(result);
    return res.status(200).json(result);
                                
  } catch (err) {
      return res.send(err);
  }
},

};


module.exports = date;
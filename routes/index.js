const mon = require('../modules/mongoose');

const date ={
  date: async function (req, res) {
    try {
      // Add current date to the request body
      const dat = { ...req.body, currentDate: new Date() };
  console.log(dat);
      // Convert totalamound, interest, and months to integers
      const name = dat.name;
      const totalamount = parseInt(dat.totalamount, 10);
      const interest = parseInt(dat.interest, 10);
      const months = parseInt(dat.months, 10);
  
      console.log(totalamount);
      console.log(interest);
  
      // Validate inputs
      if (isNaN(totalamount) || isNaN(interest) || isNaN(months)) {
        return res.status(400).send("Invalid input values for total amount, interest, or months");
      }
  
      // Calculate vatti
      const vatti = (totalamount * interest) / 100;
      const totalVatti = vatti * months;
      const totalamound =vatti+totalamount;
      console.log(vatti);
  
      // Update dat object
      // dat.vatti = totalVatti;
      // dat.totalamound = totalVatti + totalAmount;
  
      console.log(dat.totalamount);
  
      // Construct empty object
      const full= {
        name: name,
        totalamount: totalamount,
        interest: interest,
        months: months,
        vatti: vatti,
        totalVatti: totalVatti
      };
  
      // Save to the database
      await mon.full(full);
      const result = await mon.date(dat);
  
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
amoundshow: async function (req, res) {
  try {
    const name = req.body.name;
     console.log(name); 
    const result = await mon.amoundshow(name); 
    console.log(result);
    return result==='false'?(res.status(404).json({result:'not register'})):( res.status(200).json({result:'success',result}));  
                                
  } catch (err) {
      return res.send(err);
  }
},




};

module.exports = date;
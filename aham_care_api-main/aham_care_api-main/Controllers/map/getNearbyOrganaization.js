const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_MAP_API_KEY
  });

const Organaization = require ('../../models/organaization')

module.exports =  async (req, res) => {
  try {
    const { LocationData } = req.body;
    const organizationNames = ["Missionaries of charity", "His Way Children's Home", "NAMS Snehasadan"]; // replace with the names of the organizations you want to search for
    // const organaization = await Organaization.find().select("name type -_id")
    const RADIUS = 5000; // update the radius to 5 km (5000 meters)

   

    const promises = organizationNames.map((name) => {
      return new Promise((resolve, reject) => {
        googleMapsClient.places(
          {
            language: "en",
            query: name,
            location: [LocationData.lat, LocationData.long],
            radius: RADIUS,
            type: "orphanage",
          },
          (err, response) => {
            if (err) {
              reject(err);
            } else {
              const result = response.json.results[0];
              const organization = {
                name: result.name,
                address: result.formatted_address,
                phone: result.formatted_phone_number,
                rating: result.rating,
                location:result.geometry.location
              };
              resolve(organization);
            }
          }
        );
      });
    });

    Promise.all(promises)
      .then((organization) => {
        console.log(organization,"org");
        res.status(200).json(organization)
      })
      .catch((err) => {
        console.error(err);
        res.status(200).json(err)
      });
  } catch (error) {}
};

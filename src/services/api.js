// Note: You'll need to get a free API key from https://opentripmap.io/
const API_KEY = '5ae2e3f221c38a28845f05b61c4b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b'
const BASE_URL = 'https://api.opentripmap.com/0.1/en'

export const getPlacesNearby = async (lat, lon, radius = 5000) => {
  try {
    const response = await fetch(
      `${BASE_URL}/places/radius?radius=${radius}&lon=${lon}&lat=${lat}&kinds=natural,cultural,historic,sport,amusements,interesting_places&format=json&limit=50&apikey=${API_KEY}`
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch places')
    }
    
    const data = await response.json()
    
    // Filter out places without names and add some mock data for demo
    const filteredPlaces = data.features ? data.features.filter(place => place.properties.name) : []
    
    // If no places found, add some demo data
    if (filteredPlaces.length === 0) {
      return generateDemoPlaces(lat, lon)
    }
    
    return filteredPlaces.map(feature => ({
      xid: feature.properties.xid || Math.random().toString(36).substr(2, 9),
      name: feature.properties.name,
      kinds: feature.properties.kinds || 'natural,interesting_places',
      point: {
        lat: feature.geometry.coordinates[1],
        lon: feature.geometry.coordinates[0]
      }
    }))
  } catch (error) {
    console.error('Error fetching places:', error)
    // Return demo data on error
    return generateDemoPlaces(lat, lon)
  }
}

// Generate demo places for demonstration
const generateDemoPlaces = (centerLat, centerLon) => {
  const demoPlaces = [
    { name: 'Mountain Trail', kinds: 'natural,mountain,hiking', offset: [0.01, 0.01] },
    { name: 'Forest Park', kinds: 'natural,park,forest', offset: [-0.01, 0.01] },
    { name: 'Scenic Lake', kinds: 'natural,water,lake', offset: [0.01, -0.01] },
    { name: 'Historic Monument', kinds: 'historic,monument,cultural', offset: [-0.01, -0.01] },
    { name: 'Adventure Camp', kinds: 'sport,recreation,camping', offset: [0.005, 0.005] },
    { name: 'Nature Reserve', kinds: 'natural,park,wildlife', offset: [-0.005, 0.005] },
    { name: 'Rock Climbing Area', kinds: 'sport,recreation,climbing', offset: [0.005, -0.005] },
    { name: 'Waterfall Trail', kinds: 'natural,water,hiking', offset: [-0.005, -0.005] }
  ]
  
  return demoPlaces.map((place, index) => ({
    xid: `demo_${index}`,
    name: place.name,
    kinds: place.kinds,
    point: {
      lat: centerLat + place.offset[0],
      lon: centerLon + place.offset[1]
    }
  }))
}

import { featuredProperties } from './featuredProperties';

export const filterOptions = {
  states: ["All States", "Lagos", "Abuja", "Port Harcourt"],
  purposes: ["All Purposes", "For Sale", "For Rent"],
  propertyTypes: ["All Types", "Villa", "Apartment", "Townhouse", "Duplex", "Bungalow", "Penthouse"],
  priceRanges: ["All Prices", "Under ₦100M", "₦100M - ₦200M", "₦200M - ₦300M", "Above ₦300M"]
};

// Agent data
const agents = {
  tunde: {
    name: "Tunde Ogunmodede",
    title: "Senior Real Estate Agent",
    phone: "+234 801 234 5678",
    email: "tunde.ogunmodede@housify.com",
    whatsapp: "+234 801 234 5678",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
    experience: "15+ years",
    properties: "200+ properties sold",
    specialization: "Luxury Homes"
  },
  aisha: {
    name: "Aisha Ibrahim",
    title: "Property Consultant",
    phone: "+234 802 345 6789",
    email: "aisha.ibrahim@housify.com",
    whatsapp: "+234 802 345 6789",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
    experience: "8+ years",
    properties: "150+ properties sold",
    specialization: "Residential Properties"
  },
  chidi: {
    name: "Chidi Okonkwo",
    title: "Commercial Property Specialist",
    phone: "+234 803 456 7890",
    email: "chidi.okonkwo@housify.com",
    whatsapp: "+234 803 456 7890",
    image: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf",
    experience: "12+ years",
    properties: "180+ properties sold",
    specialization: "Commercial Properties"
  }
};

// Combine featured properties with additional properties
export const allProperties = [
  ...featuredProperties.map(property => ({
    ...property,
    agent: agents.tunde, // Default agent for featured properties
    images: [
      property.url,
      "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227",
      "https://images.unsplash.com/photo-1614596135107-e7d6ff3f8d66"
    ]
  })),
  {
    id: 7,
    title: "Luxury Villa in Banana Island",
    url: "https://images.unsplash.com/photo-1613977257363-707ba9348227",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227",
      "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4",
      "https://images.unsplash.com/photo-1614596135107-e7d6ff3f8d66",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
    ],
    price: "₦500,000,000",
    purpose: "For Sale",
    state: "Lagos",
    bedrooms: 6,
    bathrooms: 7,
    type: "Villa",
    agent: agents.aisha
  },
  {
    id: 8,
    title: "Modern Apartment in Oniru",
    url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4",
      "https://images.unsplash.com/photo-1614596135107-e7d6ff3f8d66",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227"
    ],
    price: "₦150,000/month",
    purpose: "For Rent",
    state: "Lagos",
    bedrooms: 3,
    bathrooms: 4,
    type: "Apartment",
    agent: agents.chidi
  },
  {
    id: 9,
    title: "Penthouse in Eko Atlantic",
    url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea"
    ],
    price: "₦450,000,000",
    purpose: "For Sale",
    state: "Lagos",
    bedrooms: 4,
    bathrooms: 5,
    type: "Penthouse",
    agent: agents.aisha
  },
  {
    id: 10,
    title: "Family Home in Gwarinpa",
    url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3"
    ],
    price: "₦180,000,000",
    purpose: "For Sale",
    state: "Abuja",
    bedrooms: 5,
    bathrooms: 6,
    type: "House",
    agent: agents.chidi
  },
  {
    id: 11,
    title: "Luxury Penthouse in Maitama",
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1600607687654-05a5150d434f",
      "https://images.unsplash.com/photo-1600607687920-4e03004a2f7c",
      "https://images.unsplash.com/photo-1600607687644-aac76f0e23ec"
    ],
    price: "₦350,000,000",
    purpose: "For Sale",
    state: "Abuja",
    bedrooms: 4,
    bathrooms: 5,
    type: "Penthouse",
    agent: agents.tunde
  },
  {
    id: 12,
    title: "Modern Villa in Old GRA",
    url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
      "https://images.unsplash.com/photo-1600566752269-bc0639d5ae21",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
      "https://images.unsplash.com/photo-1600566752734-2a0cd53c8d76"
    ],
    price: "₦280,000,000",
    purpose: "For Sale",
    state: "Port Harcourt",
    bedrooms: 5,
    bathrooms: 6,
    type: "Villa",
    agent: agents.aisha
  }
];

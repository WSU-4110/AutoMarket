partlist = []
partlist.append(dict(Name = "Bilstein B14 PSS Coilovers", PartID = "B100",
                     Category = "Suspension", Subcategory = "Coilovers",
                     Brand = "Bilstein", Ratings = 4.5, Price = 899.99,
                     Fits = ["Volkswagen GTI", "2005 - 2009",
                             "2.0L Turbocharged I4", "6-speed manual",
                             "Front-wheel drive"])
                             )
partlist.append(dict(Name = "Bilstein B16 PSS10 Coilovers", PartID = "B101",
                     Category = "Suspension", Subcategory = "Coilovers",
                     Brand = "Bilstein", Ratings = 4.5, Price = 1999.99,
                     Fits = ["Volkswagen GTI", "2005 - 2009",
                             "2.0L Turbocharged I4", "6-speed manual",
                             "Front-wheel drive"])
                             )
partlist.append(dict(Name = "Bilstein B16 DampTronic Coilovers", PartID = "B102",
                     Category = "Suspension", Subcategory = "Coilovers",
                     Brand = "Bilstein", Ratings = 4.5, Price = 2999.99,
                     Fits = ["Volkswagen GTI", "2005 - 2009",
                             "2.0L Turbocharged I4", "6-speed manual",
                             "Front-wheel drive"])
                             )
brandlist = ['AEM Performance Electronics', 'Borla Exhaust', 'Brembo',
             'Cobb Tuning', 'Eibach', 'HKS', 'Injen Technology',
             'K&N Engineering', 'KW Suspensions', 'MagnaFlow', 'Mishimoto',
             'Perrin Performance', 'Skunk2 Racing', 'Tanabe', 'Tein',
             'ACT Clutch', 'Agency Power', 'APR Performance',
             'Competition Clutch', 'Cosworth', 'DeatschWerks',
             'Dinan Engineering', 'Greddy', 'Hawk Performance',
             'Hotchkis Sport Suspension', 'Invidia', 'Koni',
             'Megan Racing', 'Nitrous Express', 'Ohlins',
             'Power Stop', 'Quaife', 'SPEC Clutch', 'StopTech',
             'Tomei', 'Vibrant Performance', "A'PEXi", 'Blackworks Racing',
             'Cusco', 'Edelbrock', 'Fidanza', 'Grams Performance',
             'ACT Clutch', 'Skunk2 Racing', 'Turbosmart', 'Wiseco',
             'Kooks Custom Headers', 'Mishimoto', 'APR Performance',
             'ETS (Extreme Turbo Systems)', 'Forgeline Motorsports',
             'Wilwood Disc Brakes', 'MagnaChip', 'Corsa Performance',
             'AWE Tuning', 'ST Suspensions', 'COBB Tuning', 'GrimmSpeed',
             'Whiteline Performance', 'Exedy', 'Buddy Club', 'Tial Sport',
             'Takata Racing', 'GSC Power-Division', 'TurboXS', 'Kraftwerks',
             'GReddy', 'Sparco', 'ARK Performance', 'ISR Performance',
             'Takeda', 'GFB (Go Fast Bits)', 'STILLEN', 'MagnaFuel', 'KONI',
             'ACDelco', 'Fluidampr', 'Airaid', 'Flowmaster', 'Holset',
             'Spoon Sports', 'ATP Turbo', 'Injector Dynamics', 'BorgWarner',
             'Gram Lights', 'OBX Racing Sports', 'Garrett Motion', 'Hondata',
             'NGK', 'Supertech', 'Bosch', 'JE Pistons']

class Car:
    def __init__(self):
        self.model = ""
        self.year = ""
        self.engine = ""
        self.transmission = ""
        self.drivetrain = ""

    def __init__(self, model, year, engine, transmission, drivetrain):
        self.model = model
        self.year = year
        self.engine = engine
        self.transmission = transmission
        self.drivetrain = drivetrain

    def get_model(self):
        return self.model
    
    def get_year(self):
        return self.year
    
    def get_engine(self):
        return self.engine
    
    def get_transmission(self):
        return self.transmission
    
    def get_drivetrain(self):
        return self.drivetrain
    
class Part:
    def __init__(self, partname, partID, category, subcategory, brand,
                 rating, price, fits):
        self.partname = partname
        self.partID = partID
        self.category = category
        self.subcategory = subcategory
        self.brand = brand
        self.rating = rating
        self.price = price
        self.fits = fits

    def get_partname(self):
        return self.partname
    
    def get_partID(self):
        return self.partID
    
    def get_category(self):
        return self.category
    
    def get_subcategory(self):
        return self.subcategory
    
    def get_brand(self):
        return self.brand
    
    def get_rating(self):
        return self.rating
    
    def get_price(self):
        return self.price
    
def main():
    finalList = []
    filterResults = []
    finalResults = []
    priceHigh = 0
    priceLow = 0
    ratingHigh = 0
    ratingLow = 0
    brand = ""
    category = ""
    subcategory = ""
    flagged = False
    
    
    car = Car("Volkswagen GTI", "2005 - 2009", "2.0L Turbocharged I4",
              "6-speed manual", "Front-wheel drive") # Needs to be changed to the car object.
    search = input("Enter search term: ") # Needs to be changed to the search bar input.

    # Checks if the car model is entered.
    if (car.get_model() != ""):
        # If it is, the results are filtered.
        for i in partlist:
            if (i["Fits"][0] == car.get_model()
                and i["Fits"][1] == car.get_year()
                and i["Fits"][2] == car.get_engine()
                and i["Fits"][3] == car.get_transmission()
                and i["Fits"][4] == car.get_drivetrain()):
                finalList.append(i)

    # Excludes results that do not meet the filter criteria
    for i in finalList:
        if ((not priceHigh == 0) and (not priceLow == 0)):
            if ((i["Price"] > priceHigh) or (i["Price"] < priceLow)):
                flagged = True
        if ((not ratingHigh == 0) and (not ratingLow == 0)):
            if ((i["Ratings"] > ratingHigh) or (i["Ratings"] < ratingLow)):
                flagged = True
        if (not brand == ""):
            if (not i["Brand"] == brand):
                flagged = True
        if (not category == ""):
            if (not i["Category"] == category):
                flagged = True
        if (not subcategory == ""):
            if (not i["Subcategory"] == subcategory):
                flagged = True
        if (flagged == False):
            filterResults.append(i)
    
    # Searches for the search term in the results. If the search term is not
    # found, the search term is searched for in the subcategory, category, and
    # brand of the results. 
    for i in filterResults:
        if (i["Name"].lower() == search.lower()):
            finalResults.append(i)
        else:
            if (search.lower() in i["Name"].lower()):
                finalResults.append(i)
            else:
                if (i["Subcategory"].lower() == search.lower()):
                    finalResults.append(i)
                else:
                    if (i["Category"].lower() == search.lower()):
                        finalResults.append(i)
                    else:
                        if (i["Brand"].lower() == search.lower()):
                            finalResults.append(i)
                            
    return finalResults

main()
partlist = []
partlist.append(dict(Name = "Bilstein B14 PSS Coilovers", PartID = "B100", Category = "Suspension", Subcategory = "Coilovers", Brand = "Bilstein", Ratings = 4.5, Price = 899.99, Fits = ["Volkswagen GTI", "2005 - 2009", "2.0L Turbocharged I4", "6-speed manual", "Front-wheel drive"]))
partlist.append(dict(Name = "Bilstein B16 PSS10 Coilovers", PartID = "B101", Category = "Suspension", Subcategory = "Coilovers", Brand = "Bilstein", Ratings = 4.5, Price = 1999.99, Fits = ["Volkswagen GTI", "2005 - 2009", "2.0L Turbocharged I4", "6-speed manual", "Front-wheel drive"]))
partlist.append(dict(Name = "Bilstein B16 DampTronic Coilovers", PartID = "B102", Category = "Suspension", Subcategory = "Coilovers", Brand = "Bilstein", Ratings = 4.5, Price = 2999.99, Fits = ["Volkswagen GTI", "2005 - 2009", "2.0L Turbocharged I4", "6-speed manual", "Front-wheel drive"]))

class Car:
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
    partname = ""
    partID = 0
    category = ""
    subcategory = ""
    brand = ""
    rating = 0.0
    price = 0.0
    car = Car("Volkswagen GTI", "2005 - 2009", "2.0L Turbocharged I4", "6-speed manual", "Front-wheel drive")
    fits = [car.get_model(), car.get_year(), car.get_engine(), car.get_transmission(), car.get_drivetrain()]
    
    def __init__(self, partname, partID, category, subcategory, brand, rating, price):
        self.partname = partname
        self.partID = partID
        self.category = category
        self.subcategory = subcategory
        self.brand = brand
        self.rating = rating
        self.price = price

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
    category = ""
    subcategory = ""
    categoryBool = False
    subcategoryBool = False
    compatible = []
    compatibleCategory = []
    compatibleSubcategory = []
    finalList = []

    car = Car("Volkswagen GTI", "2005 - 2009", "2.0L Turbocharged I4", "6-speed manual", "Front-wheel drive")

    for i in partlist:
        if (i["Fits"][0] == car.get_model()
            and i["Fits"][1] == car.get_year()
            and i["Fits"][2] == car.get_engine()
            and i["Fits"][3] == car.get_transmission()
            and i["Fits"][4] == car.get_drivetrain()):
            compatible.append(i)
    
    if subcategoryBool:
        for i in compatible:
            if (i["Subcategory"] == subcategory):
                compatibleSubcategory.append(i)
    else:
        if categoryBool:
            for i in compatible:
                if (i["Category"] == category):
                    compatibleCategory.append(i)

    if not compatibleSubcategory:
        if not compatibleCategory:
            finalList = compatible
        else:
            finalList = compatibleCategory
    else:
        finalList = compatibleSubcategory

    search(finalList)
            


def search(finalList):
    search = input("Search for products: ")
    results = []

    for i in finalList:
        if (i["Name"].lower() == search.lower()):
            results.append(i)
        else:
            if (search.lower() in i["Name"].lower()):
                results.append(i)
            else:
                if (i["Subcategory"].lower() == search.lower()):
                    results.append(i)
                else:
                    if (i["Category"].lower() == search.lower()):
                        results.append(i)
                    else:
                        if (i["Brand"].lower() == search.lower()):
                            results.append(i)

    print("Search results: ")
    for i in results:
        print(i["Name"])
    return results

main()
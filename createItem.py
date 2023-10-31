# Abstract Details Pattern

from abc import ABC, abstractmethod

# Abstract Product
class CarPart(ABC):
    def initialize(self, partId, partName, category, subCategory, fits):
        self.partId = partId
        self.partName = partName
        self.category = category
        self.subCategory = subCategory
        self.fits = fits

    @abstractmethod
    def displayPartDetails(self):
        pass


class EnginePart(CarPart):
    def display_part_details(self):
        print(f"Engine Part - ID: {self.partId}, Name: {self.partName}, Category: {self.category}, Subcategory: {self.subcategory}, Fits: {self.fits}")


class WheelPart(CarPart):
    def display_part_details(self):
        print(f"Wheel Part - ID: {self.partId}, Name: {self.partName}, Category: {self.category}, Subcategory: {self.subcategory}, Fits: {self.fits}")


class CarPartDetails(ABC):
    @abstractmethod
    def create_part(self, partId, partName, category, subcategory, fits):
        pass


class EnginePartDetails(CarPartDetails):
    def create_part(self, partId, partName, category, subcategory, fits):
        return EnginePart(partId, partName, category, subcategory, fits)


class WheelPartDetails(CarPartDetails):
    def create_part(self, partId, partName, category, subcategory, fits):
        return WheelPart(partId, partName, category, subcategory, fits)


def client_code(Details: CarPartDetails):
    part = Details.create_part("001", "V8 Engine", "Engine", "V-Type", "Sedan")
    part.display_part_details()


def main():

    Details = EnginePartDetails()
    client_code(Details)

    Details = WheelPartDetails()
    client_code(Details)

main()

#example:
#engine = EnginePart()
#engine.initialize("001", "V8 Engine", "Engine", "V-Type", "Sports Car")

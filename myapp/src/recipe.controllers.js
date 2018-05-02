const mongoose = require('mongoose');
const Recipe = mongoose.model('Recipe');

exports.findAll = function (req, res) {
    Recipe.find({}, function (err, results) {
        return res.send(results);
    });
};
exports.findById = function (req, res) {
    const id = req.params.id;
    Recipe.findOne({
        _id: id
    }, function (err, result) {
        return res.send(result);
    });
};
exports.add = function (req, res) {
    Recipe.create(req.body, function (err, recipe) {
        if (err) return console.log(err);
        return res.send(recipe);
    });
};
exports.update = function (req, res) {
    const id = req.params.id;
    const updates = req.body;

    Recipe.update({
        _id: id
    }, updates, function (err) {
        if (err) return console.log(err);
        return res.sendStatus(202);
    });
};
exports.delete = function (req, res) {
    let id = req.params.id;
    Recipe.remove({
        _id: id
    }, function (result) {
        return res.send(result);
    });
};

exports.import = function (req, res) {
    // Recipe below refers to the mongoose schema. create() is a mongoose method
    Recipe.create({
            name: 'Lasagna',
            author: 'Zach',
            date: '2013-09-01',
            description: 'Lasagna noodles piled high and layered full of three kinds of cheese to go along with the perfect blend of meaty and zesty, tomato pasta sauce all loaded with herbs.',
            ingredients: "3/4 pound ground beef. 1 medium onion, diced. 3 garlic cloves, minced. 2 cans (one 28 ounces, one 15 ounces) crushed tomatoes. 2 cans (6 ounces each) tomato paste. 2/3 cup water. 2 to 3 tablespoons sugar. 3 tablespoons plus 1/4 cup minced fresh parsley, divided. 2 teaspoons dried basil. 3/4 teaspoon fennel seed. 3/4 teaspoon salt, divided. 1/4 teaspoon coarsely ground pepper. 1 large egg, lightly beaten. 1 carton (15 ounces) ricotta cheese. 4 cups shredded part-skim mozzarella cheese",
            directions: "Cook noodles according to package directions; drain. Meanwhile, in a Dutch oven, cook sausage, beef and onion over medium heat 8-10 minutes or until meat is no longer pink, breaking up meat into crumbles. Add garlic; cook 1 minute. Drain.Stir in tomatoes, tomato paste, water, sugar, 3 tablespoons parsley, basil, fennel, 1/2 teaspoon salt and pepper; bring to a boil. Reduce heat; simmer, uncovered, 30 minutes, stirring occasionally. In a small bowl, mix egg, ricotta cheese, and remaining parsley and salt.Preheat oven to 375°. Spread 2 cups meat sauce into an ungreased 13x9-in. baking dish. Layer with three noodles and a third of the ricotta mixture. Sprinkle with 1 cup mozzarella cheese and 2 tablespoons Parmesan cheese. Repeat layers twice. Top with remaining meat sauce and cheeses (dish will be full).Bake, covered, 25 minutes. Bake, uncovered, 25 minutes longer or until bubbly. Let stand 15 minutes before serving. Yield: 12 servings.",
            images: [
                {image1: "lasagna-1.png"},
                {image2: "lasagna-2.png"},
                {image3: "lasagna-3.png"},
                {image4: "lasagna-4.png"}
            ]
        }, {
            name: 'Pho-Chicken Noodle Soup',
            author: 'Joe Montana',
            date: '2014-04-15',
            ingredients: "4 pounds beef soup bones. 1 onion, unpeeled and cut in half. 5 slices fresh ginger. 1 tablespoon salt. 2 pods star anise. 2 1/2 tablespoons fish sauce. 4 quarts water. 1 (8 ounce) package dried rice noodles",
            description: 'Pho (pronounced "fuh") is the most popular food in Vietnam, often eaten for breakfast, lunch and dinner. It is made from a special broth that simmers for several hours infused with exotic spices and served over rice noodles with fresh herbs.',
            directions: "Preheat oven to 425 degrees F (220 degrees C).Place beef bones on a baking sheet and roast in the preheated oven until browned, about 1 hour.Place onion on a baking sheet and roast in the preheated oven until blackened and soft, about 45 minutes.Place bones, onion, ginger, salt, star anise, and fish sauce in a large stockpot and cover with 4 quarts of water. Bring to a boil and reduce heat to low. Simmer on low for 6 to 10 hours. Strain the broth into a saucepan and set aside.Place rice noodles in large bowl filled with room temperature water and allow to soak for 1 hour. Bring a large pot of water to a boil and after the noodles have soaked, place them in the boiling water for 1 minute. Bring stock to a simmer.Divide noodles among 4 serving bowls; top with sirloin, cilantro, and green onion. Pour hot broth over the top. Stir and let sit until the beef is partially cooked and no longer pink, 1 to 2 minutes. Serve with bean sprouts, Thai basil, lime wedges, hoisin sauce, and chile-garlic sauce on the side.",
            images: [
                {image1: "pho-1.png"},
                {image2: ""},
                {image3: ""},
                {image4: ""}
            ]
        }, {
            name: 'Guacamole',
            author: 'Jose',
            date: '2016-10-01',
            description: 'Guacamole is definitely a staple of Mexican cuisine. Even though Guacamole is pretty simple, it can be tough to get the perfect flavor - with this authentic Mexican guacamole recipe, though, you will be an expert in no time.',
            ingredients: "2 ripe avocados. 1/2 teaspoon Kosher salt. 1 Tbsp of fresh lime juice or lemon juice. 2 Tbsp to 1/4 cup of minced red onion or thinly sliced green onion. 1-2 serrano chiles, stems and seeds removed, minced. 2 tablespoons cilantro (leaves and tender stems), finely chopped. A dash of freshly grated black pepper. 1/2 ripe tomato, seeds and pulp removed, chopped",
            directions: "1 Cut avocado, remove flesh: Cut the avocados in half. Remove seed. Score the inside of the avocado with a blunt knife and scoop out the flesh with a spoon. (See How to Cut and Peel an Avocado.) Place in a bowl. Mash with a fork: Using a fork, roughly mash the avocado. (Don't overdo it! The guacamole should be a little chunky.)Add salt, lime juice, and the rest: Sprinkle with salt and lime (or lemon) juice. The acid in the lime juice will provide some balance to the richness of the avocado and will help delay the avocados from turning brown. Add the chopped onion, cilantro, black pepper, and chiles. Chili peppers vary individually in their hotness. So, start with a half of one chili pepper and add to the guacamole to your desired degree of hotness.Remember that much of this is done to taste because of the variability in the fresh ingredients. Start with this recipe and adjust to your taste.Cover with plastic and chill to store: Place plastic wrap on the surface of the guacamole cover it and to prevent air reaching it. (The oxygen in the air causes oxidation which will turn the guacamole brown.) Refrigerate until ready to serve.Chilling tomatoes hurts their flavor, so if you want to add chopped tomato to your guacamole, add it just before serving.",
            images: [
                {image1: "guacamole-1.png"},
                {image2: ""},
                {image3: ""},
                {image4: ""}
            ]
        }, {
            name: 'Hamburger',
            author: 'Fred',
            date: '2012-10-20',
            description: 'A Hamburger (often called a burger) is a type of sandwich in the form of  rounded bread sliced in half with its center filled with a patty which is usually ground beef, then topped with vegetables such as lettuce, tomatoes and onions.',
            ingredients: "2 tablespoons Worcestershire sauce. 1/8 teaspoon cayenne pepper. 2 pounds ground beef. 1 egg, beaten.3/4 cup dry bread crumbs",
            directions: "Preheat grill for high heat.In a large bowl, mix the ground beef, egg, bread crumbs, evaporated milk, Worcestershire sauce, cayenne pepper, and garlic using your hands. Form the mixture into 8 hamburger patties.Lightly oil the grill grate. Grill patties 5 minutes per side, or until well done.",
            images: [
                {image1: "hamburger-1.png"},
                {image2: ""},
                {image3: ""},
                {image4: ""}
            ]
        },
        function (err) {
            if (err) return console.log(err);
            return res.send(202);
        }
    );
};
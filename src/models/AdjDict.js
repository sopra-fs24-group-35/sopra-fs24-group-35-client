class AdjDict {
    constructor (){
        this.dict = {
            "Alaska" : ["Northwest Territory", "Alberta", "Kamchatka"],
            "Northwest Territory" : ["Alaska", "Alberta", "Ontario", "Greenland"],
            "Greenland" : ["Northwest Territory", "Ontario", "Quebec", "Iceland"],
            "Alberta" : ["Alaska", "Northwest Territory", "Ontario", "Western US"],
            "Ontario" : ["Northwest Territory", "Alberta", "Greenland", "Quebec", "Western US", "Eastern US"],
            "Quebec" : ["Ontario", "Greenland", "Eastern US"],
            "Western US" : ["Alberta", "Ontario", "Eastern US", "Central America"],
            "Eastern US" : ["Western US", "Ontario", "Quebec", "Central America"],
            "Central America" : ["Western US", "Eastern US", "Venezuela"],
            "Venezuela" : ["Central America", "Peru", "Brazil"],
            "Peru" : ["Venezuela", "Brazil", "Argentina"],
            "Argentina" : ["Peru", "Brazil"],
            "Brazil" : ["Venezuela", "Peru", "Argentina", "North Africa"],
            "North Africa" : ["Brazil", "Western Europe", "Southern Europe", "Egypt", "East Africa", "Congo"],
            "Congo" : ["North Africa", "East Africa", "South Africa"],
            "South Africa" : ["Congo", "East Africa", "Madagascar"],
            "Madagascar" : ["South Africa", "East Africa"],
            "East Africa" : ["North Africa", "Egypt", "Congo", "South Africa", "Madagascar", "Middle East"],
            "Egypt" : ["North Africa", "Southern Europe", "Middle East", "East Africa"],
            "Southern Europe" : ["Western Europe", "Northern Europe", "Ukraine", "Middle East", "Egypt", "North Africa"],
            "Western Europe" : ["North Africa", "Great Britain", "Northern Europe", "Southern Europe"],
            "Great Britain" : ["Iceland", "Scandinavia", "Northern Europe", "Western Europe"],
            "Iceland" : ["Greenland", "Scandinavia", "Great Britain"],
            "Scandinavia" : ["Ukraine", "Northern Europe", "Great Britain", "Iceland"],
            "Northern Europe" : ["Great Britain", "Scandinavia", "Ukraine", "Southern Europe", "Western Europe"],
            "Ukraine" : ["Scandinavia", "Northern Europe", "Southern Europe", "Middle East", "Afghanistan", "Ural"],
            "Ural" : ["Ukraine", "Siberia", "China", "Afghanistan"],
            "Siberia" : ["Ural", "Yakutsk", "Irkutsk", "Mongolia", "China"],
            "Yakutsk" : ["Siberia", "Irkutsk", "Kamchatka"],
            "Irkutsk" : ["Siberia", "Yakutsk", "Kamchatka", "Mongolia"],
            "Kamchatka" : ["Alaska", "Yakutsk", "Irkutsk", "Japan", "Mongolia"],
            "Japan" : ["Kamchatka", "Mongolia"],
            "Mongolia" : ["Siberia", "Irkutsk", "Kamchatka", "Japan", "China"],
            "China" : ["Afghanistan", "Ural", "Siberia", "Mongolia", "Siam", "India"],
            "Afghanistan" : ["Ukraine", "Ural", "China", "India", "Middle East"],
            "Middle East" : ["Southern Europe", "Ukraine", "Afghanistan", "India", "East Africa", "Egypt"],
            "India" : ["Middle East", "Afghanistan", "China", "Siam", "Indonesia"],
            "Siam" : ["India", "China", "Indonesia"],
            "Indonesia" : ["Siam", "New Guinea", "Western Australia", "India"],
            "New Guinea" : ["Indonesia", "Western Australia", "Eastern Australia"],
            "Western Australia" : ["Indonesia", "Eastern Australia", "New Guinea"],
            "Eastern Australia" : ["Western Australia", "New Guinea"]

        }
    }
}

export default AdjDict;
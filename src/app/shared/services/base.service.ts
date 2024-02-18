import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  public apiUrl = environment.apiUrl;
  public easyWords = [
    "apple", "house", "dog", "cat", "ball", "tree", "book", "sun", "chair", "bird",
    "flower", "water", "fish", "moon", "hat", "cake", "bed", "duck", "key", "ship",
    "door", "smile", "baby", "lamp", "orange", "ring", "horse", "boat", "clock",
    "egg", "shirt", "guitar", "banana", "spoon", "star", "butterfly", "glass",
    "window", "sock", "shoe", "pants", "dress", "jacket", "coat", "bag", "belt",
    "tie", "scarf", "gloves", "phone", "radio", "TV", "computer", "sofa", "pillow",
    "mirror", "picture", "plant", "grass", "cloud", "rain", "snow", "wind", "storm",
    "lightning", "thunder", "rainbow", "ocean", "sea", "lake", "river", "stream",
    "mountain", "hill", "valley", "plain", "plateau", "canyon", "desert", "beach",
    "island", "volcano", "earthquake", "tsunami", "tornado", "hurricane", "thunderstorm",
    "fire", "smoke", "ash", "ember", "flame", "heat", "burn", "ignite", "extinguish",
    "charcoal", "doll", "toy", "game", "puzzle", "block", "lego", "teddy bear",
    "action figure", "board game", "music", "song", "dance", "instrument", "violin",
    "drum", "flute", "trumpet", "movie", "film", "actor", "actress", "director",
    "producer", "screenplay", "painting", "drawing", "sculpture", "photograph",
    "artist", "canvas", "brush", "palette", "easel", "studio", "football", "soccer",
    "basketball", "baseball", "tennis", "volleyball", "golf", "swimming", "diving",
    "surfing", "skiing", "snowboarding", "skateboarding", "cycling", "running",
    "jogging", "walking", "sleep", "dream", "nap", "rest", "relax", "awake", "tired",
    "yawn", "stretch", "snore", "happy", "sad", "angry", "excited", "nervous",
    "afraid", "surprised", "bored", "hungry", "hot", "cold", "warm", "cool",
    "freezing", "boiling", "sweaty", "dry", "wet", "damp", "bright", "dark",
    "light", "dim", "shiny", "dull", "glossy", "matte", "transparent", "opaque",
    "fast", "slow", "quick", "rapid", "swift", "speedy", "leisurely", "brisk",
    "steady", "gradual", "big", "small", "large", "tiny", "huge", "gigantic",
    "massive", "minuscule", "enormous", "microscopic", "old", "new", "young",
    "ancient", "modern", "historic", "antique", "contemporary", "vintage",
    "timeless"
  ];

  public mediumWords = [
    "elephant", "guitar", "castle", "bicycle", "telescope", "pizza", "tiger",
    "dragon", "camera", "helicopter", "lemonade", "piano", "lemon", "panda",
    "parrot", "robot", "turtle", "cactus", "dragonfly", "koala", "unicorn",
    "zebra", "kangaroo", "octopus", "lighthouse", "mushroom", "narwhal",
    "armadillo", "hummingbird", "platypus", "dolphin", "raccoon", "hedgehog",
    "penguin", "chameleon", "llama", "seahorse", "squirrel", "toucan",
    "camel", "lemur", "meerkat", "ocelot", "sloth", "echidna", "firefly",
    "hamster", "lemming", "puffin", "rhino", "axolotl", "badger", "barracuda",
    "gorilla", "jaguar", "porcupine", "snail", "triceratops", "badger",
    "beetle", "cheetah", "cockatoo", "dingo", "dolphin", "donkey", "eagle",
    "falcon", "goat", "hedgehog", "hippopotamus", "iguana", "jellyfish",
    "kangaroo", "lemur", "mongoose", "narwhal", "octopus", "penguin", "platypus",
    "quokka", "raccoon", "seahorse", "toucan", "umbrellabird", "vulture",
    "wallaby", "xenops", "yak", "zebra", "albatross", "bison", "caracal",
    "dormouse", "elephant", "ferret", "gnat", "hippopotamus", "impala",
    "jackal", "kangaroo", "lemur", "mongoose", "narwhal", "octopus",
    "penguin", "quetzal", "rhinoceros", "sloth", "tarsier", "urchin",
    "vulture", "weasel", "xerus", "yak", "zebra", "alligator", "butterfly",
    "crocodile", "dolphin", "elephant", "flamingo", "giraffe", "hippopotamus",
    "jaguar", "kangaroo", "lion", "mongoose", "nightingale", "opossum",
    "penguin", "quetzal", "rhinoceros", "salamander", "tiger", "unicorn",
    "vulture", "walrus", "xenops", "yak", "zebra"
  ];

  public hardWords = [
    "cacophony", "discombobulate", "exacerbate", "facetious", "gobbledygook",
    "hemidemisemiquaver", "incandescent", "juxtaposition", "kerfuffle",
    "labyrinth", "mellifluous", "nebulous", "obfuscate", "perpendicular",
    "quixotic", "rambunctious", "schadenfreude", "tintinnabulation",
    "ubiquitous", "vexatious", "whimsical", "xenophobia", "yoctosecond",
    "zeitgeist", "abstemious", "bombastic", "capricious", "draconian",
    "ephemeral", "flibbertigibbet", "gargantuan", "harbinger", "ineffable",
    "jejune", "kowtow", "lugubrious", "maelstrom", "nadir", "obstreperous",
    "panacea", "quotidian", "resplendent", "sycophant", "tumultuous",
    "uxorious", "verisimilitude", "winsome", "xenial", "yawp", "zeitgeist",
    "abnegation", "bibulous", "clandestine", "disingenuous", "equanimity",
    "fervent", "gregarious", "hedonistic", "inchoate", "jingoistic",
    "kleptomania", "lascivious", "magnanimous", "nefarious", "obsequious",
    "parsimonious", "querulous", "reticent", "sagacious", "taciturn",
    "unctuous", "vacillate", "winsome", "xenophobe", "yawp", "yuletide",
    "zeppelin", "abscond", "beleaguer", "chicanery", "deleterious",
    "effervescent", "flagrant", "garrulous", "histrionic", "inexorable",
    "juxtapose", "kinetic", "lugubrious", "mellifluous", "nefarious",
    "obtuse", "pernicious", "quixotic", "rambunctious", "salient"
  ];

  public words = {easyWords: this.easyWords, mediumWords: this.mediumWords, hardWords: this.hardWords};

}

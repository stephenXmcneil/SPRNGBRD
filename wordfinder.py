"""Word Finder: finds random words from a dictionary."""
import random

class WordFinder:
    ...
    def __init__(self, path):
        dict_file = open(path)
        self.words = self.read(dict_file)
        print(f"{len(self.words)} words read")
        
    def read(self, dict_file):

        return([w.strip() for w in dict_file])
        # w_list = []
        # for w in dict_file:
        #     w_list.append(w.strip())
        

    def random(self):
        return random.choice(self.words)
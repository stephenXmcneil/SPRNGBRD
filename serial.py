"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start=0):
        "Set up start input"
        self.start = start
        self.current = start

    def __repr__(self):
        """Show representation."""
        return f"<SerialGenerator start={self.start} current={self.current}>"

    def generate(self):
        "Generate serial number"
        self.current += 1
        return self.current

    
    def reset(self):
        """Reset number to original start."""
        self.start = 100
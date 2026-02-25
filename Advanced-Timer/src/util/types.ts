export type DurationParts = {
  hours: number;
  minutes: number;
  seconds: number;
};

export class Duration {
  private totalSeconds: number;

  private constructor(totalSeconds: number) {
    this.totalSeconds = totalSeconds;
  }

  // Factory method to create Duration from total seconds
  // the static keyword allows us to call this method without instantiating the class.
  // It validates the input and converts hours, minutes, and seconds into total seconds.
  // To create a Duration instance, you would call Duration.fromParts({ hours: 1, minutes: 30, seconds: 45 }),
  // which would return a Duration object representing 1 hour, 30 minutes, and 45 seconds.
  static fromParts({ hours, minutes, seconds }: DurationParts): Duration {
    if (![hours, minutes, seconds].every(Number.isInteger)) {
      throw new Error("Duration values must be integers.");
    }
    if (hours < 0 || minutes < 0 || seconds < 0) {
      throw new Error("Duration values must be non-negative.");
    }
    if (minutes > 59 || seconds > 59) {
      throw new Error("Minutes/seconds must be between 0 and 59.");
    }

    return new Duration(hours * 3600 + minutes * 60 + seconds);
  }

  toParts(): DurationParts {
    const hours = Math.floor(this.totalSeconds / 3600);
    const minutes = Math.floor((this.totalSeconds % 3600) / 60);
    const seconds = this.totalSeconds % 60;
    return { hours, minutes, seconds };
  }

  decrement(): Duration {
    if (this.totalSeconds === 0) {
      return this; // Return the same instance if already at zero
    }
    return new Duration(this.totalSeconds - 1);
  }

  setHours(hours: number): Duration {
    if (hours < 0) {
      throw new Error("Hours must be non-negative.");
    }
    const parts = this.toParts();
    return Duration.fromParts({ ...parts, hours });
  }

  setMinutes(minutes: number): Duration {
    if (minutes < 0 || minutes > 59) {
      throw new Error("Minutes must be between 0 and 59.");
    }
    const parts = this.toParts();
    return Duration.fromParts({ ...parts, minutes });
  }

  setSeconds(seconds: number): Duration {
    if (seconds < 0 || seconds > 59) {
      throw new Error("Seconds must be between 0 and 59.");
    }
    const parts = this.toParts();
    return Duration.fromParts({ ...parts, seconds });
  }

  isTimeUp(): boolean {
    return this.totalSeconds === 0;
  }
}

export class UserNetwork {
    constructor() {
        this.connection = navigator.connection || null;
    }

    getSpeed() {
        if (!this.connection) return "unknown";
        return this.connection.effectiveType;
    }

    getDownlink() {
        if (!this.connection) return null;
        return this.connection.downlink;
    }

    getLatency() {
        if (!this.connection) return null;
        return this.connection.rtt;
    }

    isSlow() {
        const speed = this.getSpeed();
        return speed === "slow-2g" || speed === "2g";
    }

    isSaveData() {
        if (!this.connection) return false;
        return this.connection.saveData;
    }

    isSupported() {
        return this.connection !== null;
    }

    getSummary() {
        return {
            supported: this.isSupported(),
            speed: this.getSpeed(),
            downlink: this.getDownlink(),
            latency: this.getLatency(),
            slow: this.isSlow(),
            saveData: this.isSaveData()
        };
    }

    onChange(callback) {
        if (!this.connection) return;
        this.connection.addEventListener("change", () => callback(this.getSummary()));
    }
}

export const network = new UserNetwork();
module.exports = class BaseService {
    
    generateRandomHashData() {
        return Math.random().toString(36).slice(-8);
    }

    
}
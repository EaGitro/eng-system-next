export function insertNewLine(str: string, maxChar:number){
    let result = '';
    for (let i = 0; i < str.length; i += maxChar) {
        result += str.slice(i, i + maxChar) + '\n';
    }
    return result.trim(); 
}
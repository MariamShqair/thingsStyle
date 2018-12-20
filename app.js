var fs=require("fs")

// function Read(Remove){
//     let story = fs.readFileSync('story.txt').toString().split(" ")
//     Remove(story,Freq)
// }

// function Remove(story,Freq){
//     let stopwords = fs.readFileSync('stopwords.txt').toString().split(",")
//     storyAfterRemove=[]
//     for(let i in story)
//         if(!stopwords.includes(story[i])){
//             storyAfterRemove.push(story[i])
//         }
//     Freq(storyAfterRemove,Sort)
// }

// function Freq(story,Sort){
//     let storyAfterFreq=[]
//     for(let i in story){
//         if(storyAfterFreq.find(x => x.key === story[i])){
//             storyAfterFreq.find(x => x.key === story[i]).count++
//         }else{
//             storyAfterFreq.push({key:story[i],count:1})
//         }
//     }
//     Sort(storyAfterFreq,Sort)
// }

// function Sort(storyAfterFreq,Sort){
//    console.log(storyAfterFreq.sort((a,b) =>  b.count - a.count))
// }
//Read(Remove);
class StorageManager{
    constructor(fileName){
        this.data =  fs.readFileSync(fileName).toString();
    }
    word(){
        return this.data.split(" ");
    }
}

class StopWordsManager{
    constructor(){
        this.data =  fs.readFileSync('stopwords.txt').toString().split(",");
        this.wordAfterRemoveStopWords =[]
    }
    isStopWord(word){
        
        if(!this.data.includes(word)){
            this.wordAfterRemoveStopWords.push(word)
        } 
        return this.wordAfterRemoveStopWords;

    }
}
class WordFreqManager{
    constructor(){
        this.storyAfterFreq=[]
    }
    incrementCount(word){
       
        if(this.storyAfterFreq.find(x => x.key === word)){
            this.storyAfterFreq.find(x => x.key === word).count++
        }else{
            this.storyAfterFreq.push({key:word,count:1})
        }
    }
    sort(){
      return  this.storyAfterFreq.sort((a,b) =>  b.count - a.count)
    }
    
}

class WordFrequencyController{
    constructor(fileName){
        this._storageManager = new StorageManager(fileName)
        this._stopWordsManager = new StopWordsManager()
        this._wordFreqManager = new WordFreqManager()
    }
    run(){
        let words = this._storageManager.word();
        for(let i in words){
            if(this._stopWordsManager.isStopWord(words[i]===undefined)){
                this._wordFreqManager.incrementCount(words[i]);
            }
        }
        console.log(this._wordFreqManager.sort())
       
    }
}
let WFC = new WordFrequencyController("story.txt");
WFC.run();

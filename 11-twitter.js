/*
Twitter con Tweets y Usuarios
Usuario
Propiedades
handle (string)
siguiendo (array de Usuario), inicializa vacío
Constructor
pide handle como argumento y lo agrega a su respectiva propiedad
Métodos
seguir(usuario) agrega usuario a siguiendo, si no se encuentra ya en dicho array y si no es el propio usuario (no se puede seguir a sí mismo)
getters para obtener los valores de todas las propiedades
Tweet
Propiedades
id (string)
handle (string)
texto (string)
likes (array de Usuario), inicializa en 0
retweets (array de `Usuario), inicializa en 0
Constructor
genera un id automático y lo asigna a su propiedad
pide handle y texto como argumentos y los agrega a sus respectivas propiedades
Métodos
getters para obtener los valores de todas las propiedades
darLike(usuario) agrega usuario a likes, si ya se encuentra en dicho array, debe removerlo de mismo
retweetear(usuario) agrega usuario a retweets, si ya se encuentra en dicho array, debe removerlo de mismo
Twitter
Propiedades
tweets (array de Tweet), inicializa vacío
Métodos
twittear(tweet) agrega tweet a tweets, si dicho tweet no se encuentra actualmente en el array
obtenerTimeline(usuario) devuelve un array de tweets del usuario. Este array se compone de
todos los tweets publicados por los usuarios que sigue
todos los tweets likeados por los usuarios que sigue
todos los tweets retweeteados por los usuarios que sigue
no debe haber tweets repetidos
deben estar ordenados de más nuevos a más viejos
Observaciones
Es recomendable crear métodos privados para simplificar obtenerTimeline
*/

class Usuario {

    constructor (handle){
       this.handle = handle;
       this.siguiendo = [];
    }

    // Métodos
    seguir(usuario) {
        const esMismoUsuario = this.handle === usuario.handle;
        const yaSiguiendo = this.siguiendo.some(u => u.handle === usuario.handle);
        
        if (!esMismoUsuario && !yaSiguiendo)
            this.siguiendo.push(usuario);
    }
}

class Tweet {
    // Propiedades
    #id;
    #handle;
    #texto;
    #likes = [];
    #retweets = [];

    constructor(handle, texto) {
        this.#id = crypto.randomUUID();
        this.#handle = handle;
        this.#texto = texto;
    }

    // Getters
    get id() { return this.#id; }
    get handle() { return this.#handle; }
    get texto() { return this.#texto; }
    get likes() { return [...this.#likes]; }
    get retweets() { return [...this.#retweets]; }

    // Métodos
    darLike(usuario) {
        const indice = this.#likes.findIndex(u => u.handle === usuario.handle);

        if (indice !== - 1) {
            this.#likes.splice(indice, 1);
        } else {
            this.#likes.push(usuario);
        } 
    }

    retweetear(usuario) {
        const indice = this.#retweets.findIndex(u => u.handle === usuario.handle);

        if (indice !== - 1) {
            this.#retweets.splice(indice, 1);
        } else {
            this.#retweets.push(usuario);
        } 
    }
}

class Twitter {
    // Propiedades
    #tweets = [];

    // Getter
    get tweets() { return [...this.#tweets]; }

    // Métodos
    twittear(tweet) {
        const tweetEncontrado = this.#tweets.find(t => t.id === tweet.id);
        if (!tweetEncontrado)
            this.#tweets.push(tweet);
    }

    obtenerTimeline(usuario) {
        const seguidos = usuario.siguiendo;
        const todosLosTweets = [
            ...this.#obtenerPublicados(seguidos),
            ...this.#obtenerLikeados(seguidos),
            ...this.#obtenerRetweeteados(seguidos)
        ];
        const tweetsUnicos = todosLosTweets.filter((tweet, index, self) =>
            index === self.findIndex(t => t.id === tweet.id)
        );
        return tweetsUnicos.reverse();
    }

    // Métodos privados
    #obtenerPublicados(siguiendo) {
        return this.#tweets.filter(tweet =>
            siguiendo.some(usuario => usuario.handle === tweet.handle)
        );
    }

    #obtenerLikeados(siguiendo) {
        return this.#tweets.filter(tweet =>
            siguiendo.some(u => tweet.likes.some(like => like.handle === u.handle))
        );
    }

    #obtenerRetweeteados(siguiendo) {
        return this.#tweets.filter(tweet =>
            siguiendo.some(u => tweet.retweets.some(rt => rt.handle === u.handle))
        );
    }
}

// --- Pruebas de ejecución ---

// 1. Definir usuarios e interacciones de seguimiento
// 1.1 Crear usuarios
const fer = new Usuario('fer_dev');
const ana = new Usuario('ana_code');
const profesor = new Usuario("Profe");
const hermana = new Usuario("Euge");
const esposo = new Usuario("Coti");

// 1.2 Probar método seguir()
fer.seguir(ana);
ana.seguir(fer);
profesor.seguir(fer);
hermana.seguir(fer);
esposo.seguir(fer)
fer.seguir(fer); // No debería agregarse a sí misma
fer.seguir(ana); // No debería duplicarse
fer.seguir(hermana);
fer.seguir(esposo);
ana.seguir(profesor)
console.log('Fer está siguiendo a:', fer.siguiendo.map(s => s.handle));
console.log('Ana está siguiendo a:', ana.siguiendo.map(s => s.handle));

// 2. Instanciar la clase Twitter
const miTwitter = new Twitter()

// 3. Crear Tweets
const miTweet1 = new Tweet(fer.handle, '¡Mi primer tweet haciendo TDD!');
const miTweet2 = new Tweet(fer.handle, 'Estoy estudiando Clases en JS');
const anaTweet = new Tweet(ana.handle, 'Estoy haciendo un máster en Fullstack');
const profeTweet = new Tweet(profesor.handle, 'Chicos estudien para el exámen');
const esposoTweet = new Tweet(esposo.handle, 'Fer te amo');
const miTweet3 = new Tweet(fer.handle, 'Euge te amo');

console.log(miTweet1.texto, miTweet1.handle, miTweet1.likes);

// 4. Registrar los tweets en la plataforma
miTwitter.twittear(miTweet1);
miTwitter.twittear(miTweet2);
miTwitter.twittear(miTweet3);
miTwitter.twittear(anaTweet);
miTwitter.twittear(profeTweet);
miTwitter.twittear(esposoTweet);

// 5.1 Probar darLike 
miTweet1.darLike(ana);
miTweet1.darLike(profesor);
miTweet3.darLike(hermana);
profeTweet.darLike(fer);
profeTweet.darLike(ana);
miTweet2.darLike(ana);

console.log('Likes de Fer:', miTweet1.likes.length + miTweet2.likes.length + miTweet3.likes.length);

// 5.2 (Toggle)
console.log('Likes del tweet 1 de Fer antes de toggle:', miTweet1.likes.length);//2
miTweet1.darLike(ana); // Dar like de nuevo lo saca
console.log('Likes del tweet 1 de Fer tras toggle:', miTweet1.likes.length);//1

// 6.1 Probar retweetear 
miTweet1.retweetear(ana);
profeTweet.retweetear(ana);
profeTweet.retweetear(fer)
console.log('Retweets del tweet 1 de Fer:', miTweet1.retweets.length); // Debería ser 1
console.log('Retweets del tweet del profe:', profeTweet.retweets.length); // Debería ser 2

// 6.2 (Toggle)
miTweet1.retweetear(ana);
console.log('Retweets del tweet 1 de Fer después de toogle:', miTweet1.retweets.length); // Debería ser 0

// 7. Probar TimeLine
console.table(miTwitter.obtenerTimeline(fer).map(t => ({Autor: t.handle, Texto: t.texto})));
console.table(miTwitter.obtenerTimeline(ana).map(t => ({Autor: t.handle, Texto: t.texto})));
console.table(miTwitter.obtenerTimeline(profesor).map(t => ({Autor: t.handle, Texto: t.texto})));
console.table(miTwitter.obtenerTimeline(esposo).map(t => ({Autor: t.handle, Texto: t.texto})));
console.table(miTwitter.obtenerTimeline(hermana).map(t => ({Autor: t.handle, Texto: t.texto})));

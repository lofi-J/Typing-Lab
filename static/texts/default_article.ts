export type TLang = 'en' | 'ko';

export interface IContents {
  title: string;
  author?: string;
  lang: TLang;
  contents: string; 
}

const default_contents = {
  title: 'The Leaving Season',
  author: 'Eunha Yoon',
  lang: 'en' as TLang,
  contents: "Even if love doesn't end, there comes a time when you have to leave. Even if I couldn't say it, there are things I leave behind. For you who will wake up from sleep, I covered you with gentle sunlight. When you wither in the scorching heat, I spread a piece of cloud. To ease the weight of the sunset, I blew a breath of wind. In the darkness of the deep night, I floated a single longing star. For that day, I give you the gift of seasons. For you, I leave with your lips losing their red hue, carrying fresh fruit. For me, I leave, reminiscing our brilliant youth that disappeared beyond memory. Even if I can't speak of love, I leave, kissing the season I leave behind. If there were moments of love, it would be the season we left behind. If there were fleeting moments of love, to remember that a seamless season remains, I leave with my arms full, holding it all close."
}

export default default_contents;
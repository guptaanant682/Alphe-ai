declare module 'animejs' {
  interface AnimeParams {
    targets?: any;
    [key: string]: any;
  }

  interface AnimeInstance {
    play(): void;
    pause(): void;
    restart(): void;
    reverse(): void;
    seek(time: number): void;
    remove(targets: any): void;
  }

  function anime(params: AnimeParams): AnimeInstance;
  
  namespace anime {
    function timeline(params?: any): any;
    function random(min: number, max: number): number;
    function set(targets: any, properties: any): void;
    function setDashoffset(el: any): number;
    function stagger(value: number, options?: any): any;
  }

  export = anime;
}
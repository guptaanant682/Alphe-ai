declare module 'animejs' {
  interface AnimeParams {
    targets?: string | Element | Element[] | NodeList;
    [key: string]: unknown;
  }

  interface AnimeInstance {
    play(): void;
    pause(): void;
    restart(): void;
    reverse(): void;
    seek(time: number): void;
    remove(targets: string | Element | Element[] | NodeList): void;
  }

  function anime(params: AnimeParams): AnimeInstance;
  
  namespace anime {
    function timeline(params?: Record<string, unknown>): AnimeInstance;
    function random(min: number, max: number): number;
    function set(targets: string | Element | Element[] | NodeList, properties: Record<string, unknown>): void;
    function setDashoffset(el: Element): number;
    function stagger(value: number, options?: Record<string, unknown>): number[];
  }

  export = anime;
}
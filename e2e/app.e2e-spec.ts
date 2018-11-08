import { SitraElamantapatestiPage } from './app.po';

describe('sitra-elamantapatesti App', () => {
  let page: SitraElamantapatestiPage;

  beforeEach(() => {
    page = new SitraElamantapatestiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

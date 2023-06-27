
import {addImgToDb , getImgByUrl} from '../services/imgService.js';

describe('getImgByUrl', () => {
    it('should call getImgsFromDBByUrl with the correct URL', async () => {
        const url = 'https://example.com/image.jpg';
        const res = await getImgByUrl(url);
        expect(res).toEqual(can2);
        expect(getImgsFromDBByUrl).toHaveBeenCalledWith(url);
    });
});



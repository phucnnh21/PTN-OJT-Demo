import * as yup from "yup";

const REGEX_PASSWORD = /^[a-zA-Z0-9!@#$%^&*_-]{8,50}$/;
const REGEX_NAME =
    /^(?![\s.]+$)[一-龠ぁ-ゔァ-ヴーａ-ｚＡ-Ｚ０-９々〆〤ヶa-zA-Z0-9aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ\s.]*$/u;
const REGEX_ONLY_NUMBER = /^\d+$/;

yup.addMethod(yup.string, "password", function (message) {
    return this.matches(REGEX_PASSWORD, {
        message,
        excludeEmptyString: true,
    });
});

yup.addMethod(yup.string, "onlyNumber", function (message) {
    return this.matches(REGEX_ONLY_NUMBER, {
        message,
        excludeEmptyString: true,
    });
});

yup.addMethod(yup.string, "name", function (message) {
    return this.matches(REGEX_NAME, {
        message,
        excludeEmptyString: true,
    });
});

export default yup;

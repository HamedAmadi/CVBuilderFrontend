import {FC, Fragment} from "react";
import {Page, Text, View, Document, StyleSheet, Font, Link} from '@react-pdf/renderer';
import IranSanseL from '../../../assets/fonts/IRANSans/_persian-number/ttf/IRANSansWeb(FaNum)_Light.ttf'
import IranSanseB from '../../../assets/fonts/IRANSans/_persian-number/ttf/IRANSansWeb(FaNum)_Bold.ttf'
import IranSanseUL from '../../../assets/fonts/IRANSans/_persian-number/ttf/IRANSansWeb(FaNum)_UltraLight.ttf'
import IranSanse from '../../../assets/fonts/IRANSans/_persian-number/ttf/IRANSansWeb(FaNum).ttf'
import PersianText from "../PersianText/PersianText";
import Square from "./Square";
import Star from "../PDFTemplate1/Star";
import {EducationItem} from "../EducationForm/EducationForm";
import {JobExperienceItem} from "../JobExperienceForm/JobExperienceForm";
import {CertificateItem} from "../CertificateForm/CertificateForm";
import {LanguageItem} from "../LanguageForm/LanguageForm";
import {SkillItem} from "../SkillForm/SkillForm";
import {SocialMediaItem} from "../SocialMediaForm/SocialMediaForm";
import {ProjectItem} from "../ProjectForm/ProjectForm";
import {Resume} from "../PDFTemplate6/PDFTemplate6";
Font.register( {
  family: "IranSanse",
  fonts: [
    {src: IranSanseL, fontStyle: 'light'},
    {src: IranSanseUL, fontStyle: 'ultralight'},
    {src: IranSanseB, fontStyle: 'bold'},
    {src: IranSanse, fontStyle: 'normal'},
  ]
} );

const styles = StyleSheet.create( {
  viewer: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  page: {
    padding: '22 30',
    fontFamily: 'IranSanse',
  },
  basicInfoView: {
    textAlign: 'center',
  },
  name: {
    alignSelf: 'center',
    fontFamily: 'IranSanse',
    fontSize: 17,
    fontStyle: "bold"
  },
  position: {
    fontFamily: 'IranSanse',
    textAlign: 'center',
    fontSize: 12,
    fontStyle: 'normal',
  },
  info: {
    alignSelf: 'center',
    flexDirection: 'row-reverse',
  },
  address: {
    fontSize: 9,
    fontFamily: 'IranSanse',
    fontStyle: 'normal',
    marginTop: 2,
  },
  contact: {
    fontSize: 10,
    fontFamily: 'IranSanse',
    fontStyle: 'light',
  },
  title: {
    backgroundColor: 'gainsboro',
    textAlign: 'center',
    fontSize: 12,
    paddingBottom: 2,
    paddingTop: 2,
    borderBottom: 1.5,
    borderColor: 'gray',
    marginTop: 4,
  },
  section: {
    margin: '6 0'
  },
  sectionViewWrapper: {
    paddingTop: 2,
    marginBottom: 2,
  },
  line: {
    borderBottom: 1,
    borderColor: 'gray',
    marginBottom: 1,
  },
  bioSection: {
    padding: '4 16'
  },
  eduItem: {
    margin: '6 0'
  },
  eduItemTopSection: {
    flexDirection: "row-reverse",
    alignItems: 'baseline',
  },
  eduItemBottomSection: {
    marginRight: 18
  },
  squareWrapper: {
    width: 10,
    height: 10,
    marginLeft: 6,
    top: -4,
  },
  dotted: {
    fontSize: 12,
    color: 'gray',
    flex: 1,
    overflow: 'hidden',
    margin: '0 6'
  },
  itemWrapper: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
  },
  item: {
    width: '50%',
    flexDirection: 'row-reverse',
    alignItems: 'baseline',
    padding: '0 10'
  },
  ratingStar: {
    flexDirection: 'row',
    color: 'black',
    top: -3,
    // paddingVertical: 0,
  },
  socialMediaSection: {
    margin: '6 0',
    flexDirection: 'row-reverse',
    alignItems: 'baseline',
    flexWrap: 'wrap',
  },
  socialMediaItem: {
    padding: '0 8',
    width: "50%",
  },
  link: {
    textDecoration: 'underline',
  },
  projectLink: {
    flexDirection: 'row-reverse',
    fontSize: 10
  }
} )

interface Props {
  resume: Resume
}

const PDFTemplate2: FC<Props> = ( {resume} ) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {resume.basicInformation &&
          <View style={styles.basicInfoView}>
            {( resume.basicInformation.lastName !== '' || resume.basicInformation.firstName !== '' ) &&
              <View style={styles.info}>
                {resume.basicInformation.firstName !== '' && <PersianText text={resume.basicInformation.firstName} fontStyle={"bold"} fontSize={19} marginTop={0} marginBottom={0} />}
                {resume.basicInformation.lastName !== '' && <PersianText text={resume.basicInformation.lastName} fontStyle={"bold"} fontSize={19} marginTop={0} marginBottom={0} />}
              </View>
            }
            {resume.basicInformation.jobTitle !== '' &&
              <View style={styles.info}>
                <PersianText text={resume.basicInformation.jobTitle} fontStyle={"normal"} fontSize={12} marginTop={0} marginBottom={0} />
              </View>
            }
            <View style={styles.info}>
              {resume.basicInformation.birthDate !== '' && <PersianText text={`متولد: ${resume.basicInformation.birthDate}`} fontStyle={"light"} fontSize={9} marginTop={4} marginBottom={0} />}
              {resume.basicInformation.birthDate !== '' && resume.basicInformation.maritalStatus !== '' && <PersianText text={' ، '} fontStyle={"light"} fontSize={9} marginTop={4} marginBottom={0} />}
              {resume.basicInformation.maritalStatus !== '' && <PersianText text={`وضعیت تأهل: ${resume.basicInformation.maritalStatus}`} fontStyle={"light"} fontSize={9} marginTop={4} marginBottom={0} />}
              {resume.basicInformation.maritalStatus !== '' && resume.basicInformation.soldieringStatus !== '' && <PersianText text={' ، '} fontStyle={"light"} fontSize={9} marginTop={4} marginBottom={0} />}
              {resume.basicInformation.birthDate !== '' && resume.basicInformation.soldieringStatus !== '' && resume.basicInformation.maritalStatus === '' && < PersianText text={' ، '} fontStyle={"light"} fontSize={9} marginTop={4} marginBottom={0} />}
              {resume.basicInformation.soldieringStatus !== '' && <PersianText text={`وضعیت سربازی: ${resume.basicInformation.soldieringStatus}`} fontStyle={"light"} fontSize={9} marginTop={4} marginBottom={0} />}
            </View>
            <View style={styles.info}>
              {resume.basicInformation.city !== '' && <PersianText text={resume.basicInformation.city} fontStyle={"light"} fontSize={9} marginTop={2} marginBottom={0} />}
              {resume.basicInformation.city !== '' && resume.basicInformation.address !== '' && <PersianText text={' - '} fontStyle={"light"} fontSize={9} marginTop={2} marginBottom={0} />}
              {resume.basicInformation.address !== '' && <PersianText text={`${resume.basicInformation.address}`} fontStyle={"light"} fontSize={9} marginTop={2} marginBottom={0} />}
            </View>
            <View style={styles.info}>
              {resume.basicInformation.email !== '' && <PersianText text={resume.basicInformation.email} fontStyle={"normal"} fontSize={10} marginTop={2} marginBottom={0} />}
              {resume.basicInformation.email !== '' && resume.basicInformation.mobileNumber !== '' && <PersianText text={' ، '} fontStyle={"normal"} fontSize={10} marginTop={2} marginBottom={0} />}
              {resume.basicInformation.mobileNumber !== '' && <PersianText text={resume.basicInformation.mobileNumber} fontStyle={"normal"} fontSize={10} marginTop={2} marginBottom={0} />}
            </View>
          </View>}
        <View style={styles.line}></View>
        <View style={styles.line}></View>
        <View>
          {resume.aboutMe && resume.aboutMe.description !== '' &&
            <View>
              <View style={styles.title}>
                <Text>درباره من</Text>
              </View>
              <View style={styles.bioSection}>
                {resume.aboutMe.description.split( '\n' ).map( ( line: string, i: number ) => <PersianText key={i} text={line} fontStyle={"light"} fontSize={10} marginTop={0} marginBottom={0} /> )}
              </View>
            </View>
          }
        </View>
        {resume.educationItem.length !== 0 &&
          resume.educationItem.map( ( educationItem: EducationItem, i: number ) => {
            return (
              <View key={i} wrap={false}>
                {i === 0 &&
                  <View style={styles.title}>
                    <Text>سوابق تحصیلی</Text>
                  </View>}
                <View style={styles.section}>
                  <View style={styles.eduItemTopSection}>
                    <View style={styles.squareWrapper}>
                      <Square />
                    </View>
                    <View>
                      <PersianText text={`${educationItem.degree} ${educationItem.study}`} fontStyle={"normal"} fontSize={12} marginTop={0} marginBottom={0} />
                    </View>
                    <Text style={styles.dotted}>........................................................................................................</Text>
                    <View>
                      <PersianText text={`${educationItem.startDate}${educationItem.startDate && educationItem.endDate && ' - '}${educationItem.endDate}`} fontStyle={"ultralight"} fontSize={12} marginTop={0} marginBottom={0} />
                    </View>
                  </View>
                  <View style={styles.eduItemBottomSection}>
                    <PersianText text={educationItem.university} fontStyle={"light"} fontSize={11} marginTop={0} marginBottom={0} />
                  </View>
                </View>
              </View>
            )
          } )
        }
        {resume.jobExperienceItem.length !== 0 &&
          resume.jobExperienceItem.map( ( jobExperienceItem: JobExperienceItem, i: number ) => {
            return (
              <View key={i} wrap={false}>
                {i === 0 &&
                  <View style={styles.title}>
                    <Text>سوابق شغلی</Text>
                  </View>}
                <View style={styles.eduItem}>
                  <View style={styles.eduItemTopSection}>
                    <View style={styles.squareWrapper}>
                      <Square />
                    </View>
                    <View>
                      <PersianText text={jobExperienceItem.jobPosition} fontStyle={"normal"} fontSize={12} marginTop={0} marginBottom={0} />
                    </View>
                    <Text style={styles.dotted}>........................................................................................................</Text>
                    <View>
                      <PersianText text={`${jobExperienceItem.startDate}${jobExperienceItem.startDate && jobExperienceItem.endDate && ' - '}${jobExperienceItem.endDate}`} fontStyle={"ultralight"} fontSize={12} marginTop={0} marginBottom={0} />
                    </View>
                  </View>
                  <View style={styles.eduItemBottomSection}>
                    <PersianText text={jobExperienceItem.companyName} fontStyle={"light"} fontSize={11} marginTop={0} marginBottom={0} />
                  </View>
                </View>
              </View>
            )
          } )
        }
        {resume.certificateItem.length !== 0 &&
          resume.certificateItem.map( ( certificateItem: CertificateItem, i: number ) => {
            return (
              <View key={i} wrap={false}>
                {i == 0 &&
                  <View style={styles.title}>
                    <Text>دوره ها و گواهینامه ها</Text>
                  </View>}
                <View style={styles.section}>
                  <View style={styles.eduItemTopSection}>
                    <View style={styles.squareWrapper}>
                      <Square />
                    </View>
                    <View>
                      <PersianText text={certificateItem.certificateName} fontStyle={"normal"} fontSize={12} marginTop={0} marginBottom={0} />
                    </View>
                    <Text style={styles.dotted}>........................................................................................................</Text>
                    <View>
                      <PersianText text={`${certificateItem.startDate}${certificateItem.startDate && certificateItem.endDate && ' - '}${certificateItem.endDate}`} fontStyle={"ultralight"} fontSize={12} marginTop={0} marginBottom={0} />
                    </View>
                  </View>
                  <View style={styles.eduItemBottomSection}>
                    <PersianText text={certificateItem.institution} fontStyle={"light"} fontSize={11} marginTop={0} marginBottom={0} />
                  </View>
                </View>
              </View>
            )
          } )
        }
        {resume.languageItem.length !== 0 &&
          <View wrap={false}>
            <View style={styles.title}>
              <Text>زبان</Text>
            </View>
            <View style={styles.section}>
              <View style={styles.itemWrapper}>
                {
                  resume.languageItem.map( ( languageItem: LanguageItem, i: number ) => {
                    return (
                      <View key={i} style={styles.item}>
                        <View>
                          <PersianText text={languageItem.languageName} fontStyle={"normal"} fontSize={12} marginTop={0} marginBottom={0} />
                        </View>
                        <Text style={styles.dotted}>........................................................................................................</Text>
                        {
                          languageItem.level === 'زبان مادری' ?
                            <View style={{top: -1, flexDirection: 'row', color: 'black'}}>
                              <PersianText text={'زبان مادری'} fontStyle={"normal"} fontSize={10} marginTop={0} marginBottom={0} />
                            </View>
                            :
                            languageItem.level === 'مبتدی' ?
                              <View style={styles.ratingStar}>
                                <Star color="black" />
                              </View>
                              :
                              languageItem.level === 'پایین تر متوسط' ?
                                <View style={styles.ratingStar}><Star color="black" /><Star color="black" /></View>
                                :
                                languageItem.level === 'متوسط' ?
                                  <View style={styles.ratingStar}><Star color="black" /><Star color="black" /><Star color="black" /></View>
                                  :
                                  languageItem.level === 'بالا تر از متوسط' ?
                                    <View style={styles.ratingStar}><Star color="black" /><Star color="black" /><Star color="black" /><Star color="black" /></View>
                                    :
                                    languageItem.level === 'پیشرفته' ?
                                      <View style={styles.ratingStar}><Star color="black" /><Star color="black" /><Star color="black" /><Star color="black" /><Star color="black" /></View>
                                      :
                                      <Fragment></Fragment>
                        }
                      </View>
                    )
                  } )
                }
              </View>
            </View>
          </View>
        }
        {resume.skillItem.length !== 0 &&
          <View wrap={false}>
            <View style={styles.title}>
              <Text>مهارت ها</Text>
            </View>
            <View style={styles.section}>
              <View style={styles.itemWrapper}>
                {
                  resume.skillItem.map( ( skillItem: SkillItem, i: number ) => {
                    return (
                      <View key={i} style={styles.item}>
                        <View>
                          <PersianText text={skillItem.skillName} fontStyle={"normal"} fontSize={12} marginTop={0} marginBottom={0} />
                        </View>
                        <Text style={styles.dotted}>........................................................................................................</Text>
                        <View style={styles.ratingStar}>
                          {
                            skillItem.level === 'درحال یادگیری' ?
                              <Star color="black" />
                              :
                              skillItem.level === 'کم تجربه' ?
                                <Fragment><Star color="black" /><Star color="black" /></Fragment>
                                :
                                skillItem.level === 'تسلط نسبی' ?
                                  <Fragment><Star color="black" /><Star color="black" /><Star color="black" /></Fragment>
                                  :
                                  skillItem.level === 'تسلط کامل' ?
                                    <Fragment><Star color="black" /><Star color="black" /><Star color="black" /><Star color="black" /></Fragment>
                                    :
                                    skillItem.level === 'حرفه ای' ?
                                      <Fragment><Star color="black" /><Star color="black" /><Star color="black" /><Star color="black" /><Star color="black" /></Fragment>
                                      :
                                      <Fragment></Fragment>
                          }

                        </View>
                      </View>
                    )
                  } )
                }
              </View>
            </View>
          </View>
        }
        {resume.socialMediaItem.length !== 0 &&
          <View wrap={false}>
            <View style={styles.title}>
              <Text>شبکه های اجتماعی</Text>
            </View>
            <View style={styles.socialMediaSection}>
              {
                resume.socialMediaItem.map( ( socialMediaItem: SocialMediaItem, i: number ) => {
                  return (
                    <View key={i} style={styles.socialMediaItem}>
                      <Link src={socialMediaItem.link} style={styles.link}>
                        <PersianText text={socialMediaItem.title} fontStyle={"normal"} fontSize={10} marginTop={2} marginBottom={4} />
                      </Link>
                    </View>
                  )
                } )
              }
            </View>
          </View>
        }
        {resume.projectItem.length !== 0 &&
          resume.projectItem.map( ( projectItem: ProjectItem, i: number ) => {
            return (
              <View key={projectItem._id} wrap={false}>
                {i === 0 &&
                  <View style={styles.title}>
                    <Text>پروژه ها</Text>
                  </View>
                }
                <View>
                  <View style={styles.eduItemTopSection}>
                    <View style={styles.squareWrapper}>
                      <Square />
                    </View>
                    <View>
                      <PersianText text={`${projectItem.title}${projectItem.title && projectItem.employer && ' - '}${projectItem.employer}`} fontStyle={"normal"} fontSize={12} marginTop={0} marginBottom={0} />
                    </View>
                    <Text style={styles.dotted}>........................................................................................................</Text>
                    <View>
                      <PersianText text={`${projectItem.startDate}${projectItem.startDate && projectItem.endDate && ' - '}${projectItem.endDate}`} fontStyle={"ultralight"} fontSize={12} marginTop={0} marginBottom={0} />
                    </View>
                  </View>
                  <View style={styles.eduItemBottomSection}>
                    {projectItem.description &&
                      <Fragment>
                        <PersianText text={'توضیحات:'} fontStyle={"light"} fontSize={10} marginTop={4} marginBottom={0} />
                        {projectItem.description.split( '\n' ).map( ( line: string, i: number ) => <PersianText key={i} text={line} fontStyle={"light"} fontSize={10} marginTop={1} marginBottom={0} /> )}
                      </Fragment>
                    }
                    {projectItem.link &&
                      <Fragment>
                        <PersianText text={`لینک پروژه:`} fontStyle={"normal"} fontSize={10} marginTop={4} marginBottom={0} />
                        <Link style={styles.projectLink} src={projectItem.link}>
                          <Text>{projectItem.link}</Text>
                        </Link>
                      </Fragment>
                    }
                  </View>
                </View>
              </View>
            )
          } )
        }
      </Page>
    </Document>
  )
};

export default PDFTemplate2;

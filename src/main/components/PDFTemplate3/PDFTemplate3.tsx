import {FC, Fragment} from "react";
import {Page, Text, View, Document, StyleSheet, Font, Link, Image} from '@react-pdf/renderer';
import IranSanseL from '../../../assets/fonts/IRANSans/_persian-number/ttf/IRANSansWeb(FaNum)_Light.ttf'
import IranSanseB from '../../../assets/fonts/IRANSans/_persian-number/ttf/IRANSansWeb(FaNum)_Bold.ttf'
import IranSanseUL from '../../../assets/fonts/IRANSans/_persian-number/ttf/IRANSansWeb(FaNum)_UltraLight.ttf'
import IranSanse from '../../../assets/fonts/IRANSans/_persian-number/ttf/IRANSansWeb(FaNum).ttf'
import MobileIcon from '../../../assets/smartphone.png'
import EnvelopeIcon from '../../../assets/envelope.png'
import LocationIcon from '../../../assets/location-pin.png'
import PersianText from "../PersianText/PersianText";
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
    {src: IranSanse, fontStyle: 'lightnormal', fontWeight: 'thin'},
  ]
} );

const styles = StyleSheet.create( {
  viewer: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  page: {
    padding: '20 20',
    fontFamily: 'IranSanse',
    flexDirection: 'row-reverse',
    backgroundColor: '#f9f9f9'
  },
  rightSection: {
    width: '38%',
    paddingLeft: 10,
  },
  leftSection: {
    width: '62%',
    paddingRight: 10,
  },
  name: {
    justifyContent: 'center',
    // textAlign: 'center',
    // width: '100%',
    flexDirection: 'row-reverse',
    // fontFamily: 'IranSanse',
    // alignSelf: 'center',
    // fontSize: 19,
    // fontStyle: "normal"
  },
  position: {
    color: '#00668f',
    paddingBottom: 4,
    borderBottom: 1.5,
    borderColor: '#007baa',
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 6,
    marginTop: 4,
    fontSize: 11,
    fontStyle: 'lightnormal'
  },
  title: {
    flexDirection: "row-reverse",
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: -6,
  },
  titleText: {
    fontSize: 12,
    fontStyle: 'bold',
    color: '#007baa',
  },
  titleLineRight: {
    flex: 1,
    overflow: 'hidden',
    marginLeft: 4,
    top: -8,
    color: '#007baa'
  },
  titleLineLeft: {
    flex: 1,
    overflow: 'hidden',
    marginRight: 4,
    top: -8,
    color: '#007baa',
  },
  img: {
    width: 10,
    height: 10,
    color: '#007baa',
    margin: '2 0 auto 8',
  },
  progressBorder: {
    flexDirection: 'row',
    margin: 'auto 0',
    width: 60,
    height: 5,
    border: 1,
    borderRadius: 2,
    borderColor: '#007baa'
  },
  progressFill20: {
    width: '20%',
    backgroundColor: '#007baa',
    height: 3.4,
    marginTop: -0.2,
    borderRadius: 1,
  },
  progressFill40: {
    width: '40%',
    backgroundColor: '#007baa',
    height: 3.4,
    marginTop: -0.2,
    borderRadius: 1,
  },
  progressFill60: {
    width: '60%',
    backgroundColor: '#007baa',
    height: 3.4,
    marginTop: -0.2,
    borderRadius: 1,
  },
  progressFill80: {
    width: '80%',
    backgroundColor: '#007baa',
    height: 3.4,
    marginTop: -0.2,
    borderRadius: 1,
  },
  progressFill100: {
    width: '100%',
    backgroundColor: '#007baa',
    height: 3.4,
    marginTop: -0.2,
    borderRadius: 1,
  },
  link: {
    textDecoration: 'underline',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    backgroundColor: '#007baa',
    marginTop: 5,
    marginLeft: 8
  },
  projectLink: {
    flexDirection: 'row-reverse',
    fontSize: 10
  },
} )

interface Props {
  resume: Resume
}

const PDFTemplate3: FC<Props> = ( {resume} ) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.rightSection}>
          {resume.basicInformation &&
            <View>
              <View style={{alignItems: 'center'}}>
                {( resume.basicInformation.lastName !== '' || resume.basicInformation.firstName !== '' ) &&
                  <View style={styles.name}>
                    {resume.basicInformation.firstName !== '' && <PersianText text={resume.basicInformation.firstName} fontStyle={"bold"} fontSize={15} marginTop={0} marginBottom={0} />}
                    {resume.basicInformation.lastName !== '' && <PersianText text={resume.basicInformation.lastName} fontStyle={"bold"} fontSize={15} marginTop={0} marginBottom={0} />}
                  </View>
                }
                {resume.basicInformation.jobTitle !== '' && <Text style={styles.position}>{resume.basicInformation.jobTitle}</Text>}
                {resume.basicInformation.birthDate !== '' && <PersianText text={`متولد : ${resume.basicInformation.birthDate}`} fontStyle={"lightnormal"} fontSize={9} marginTop={0} marginBottom={0} />}
                {resume.basicInformation.maritalStatus !== '' && <PersianText text={`وضعیت تأهل : ${resume.basicInformation.maritalStatus}`} fontStyle={"lightnormal"} fontSize={9} marginTop={3} marginBottom={0} />}
                {resume.basicInformation.soldieringStatus !== '' && <PersianText text={`وضعیت سربازی : ${resume.basicInformation.soldieringStatus}`} fontStyle={"lightnormal"} fontSize={9} marginTop={3} marginBottom={0} />}
              </View>
              {( resume.basicInformation.email !== '' || resume.basicInformation.mobileNumber !== '' || resume.basicInformation.city !== '' || resume.basicInformation.address !== '' ) &&
                <Fragment>
                  <View style={styles.title}>
                    <Text style={styles.titleLineRight}>___________________</Text>
                    <View>
                      <Text style={styles.titleText}>اطلاعات تماس</Text>
                    </View>
                    <Text style={styles.titleLineLeft}>____________________</Text>
                  </View>
                  <View>
                    {resume.basicInformation.email !== '' &&
                      <View style={{flexDirection: 'row-reverse', marginBottom: 4}}>
                        <Image style={styles.img} src={EnvelopeIcon} />
                        <PersianText text={resume.basicInformation.email} fontStyle={"lightnormal"} fontSize={9} marginTop={0} marginBottom={0} />
                      </View>
                    }
                    {resume.basicInformation.mobileNumber !== '' &&
                      <View style={{flexDirection: 'row-reverse', marginBottom: 4}}>
                        <Image style={styles.img} src={MobileIcon} />
                        <PersianText text={resume.basicInformation.mobileNumber} fontStyle={"lightnormal"} fontSize={9} marginTop={0} marginBottom={0} />
                      </View>
                    }
                    {( resume.basicInformation.city !== '' || resume.basicInformation.address !== '' ) &&
                      <View style={{flexDirection: 'row-reverse'}}>
                        <Image style={styles.img} src={LocationIcon} />
                        {resume.basicInformation.city !== '' && <PersianText text={resume.basicInformation.city} fontStyle={"light"} fontSize={9} marginTop={0} marginBottom={0} />}
                        {resume.basicInformation.city !== '' && resume.basicInformation.address !== '' && <PersianText text={'- '} fontStyle={"light"} fontSize={9} marginTop={0} marginBottom={0} />}
                        {resume.basicInformation.address !== '' && <PersianText text={resume.basicInformation.address} fontStyle={"light"} fontSize={9} marginTop={0} marginBottom={0} />}
                      </View>
                    }
                  </View>
                </Fragment>
              }
            </View>
          }
          <View>
            {resume.aboutMe && resume.aboutMe.description !== '' &&
              <Fragment>
                <View style={styles.title}>
                  <Text style={styles.titleLineRight}>___________________</Text>
                  <View>
                    <Text style={styles.titleText}>درباره من</Text>
                  </View>
                  <Text style={styles.titleLineLeft}>____________________</Text>
                </View>
                <View>
                  {resume.aboutMe.description.split( '\n' ).map( ( line: string, i: number ) => <PersianText key={i} text={line} fontStyle={"lightnormal"} fontSize={9} marginTop={0} marginBottom={0} /> )}
                </View>
              </Fragment>
            }
          </View>
          {resume.languageItem.length !== 0 &&
            resume.languageItem.map( ( languageItem: LanguageItem, i: number ) => {
              return (
                <View key={i} wrap={false}>
                  {i === 0 &&
                    <View style={styles.title}>
                      <Text style={styles.titleLineRight}>___________________</Text>
                      <View>
                        <Text style={styles.titleText}>زبان</Text>
                      </View>
                      <Text style={styles.titleLineLeft}>____________________</Text>
                    </View>}
                  <View>
                    <View style={{flexDirection: 'row-reverse', justifyContent: "space-between"}}>
                      <PersianText text={languageItem.languageName} fontStyle={"lightnormal"} fontSize={10} marginTop={0} marginBottom={0} />
                      {
                        languageItem.level === 'زبان مادری' ?
                          <View>
                            <PersianText text={'زبان مادری'} fontStyle={"normal"} fontSize={9} marginTop={0} marginBottom={0} />
                          </View>
                          :
                          languageItem.level === 'مبتدی' ?
                            <View style={styles.progressBorder}>
                              <View style={styles.progressFill20}></View>
                            </View>
                            :
                            languageItem.level === 'پایین تر متوسط' ?
                              <View style={styles.progressBorder}>
                                <View style={styles.progressFill40}></View>
                              </View>
                              :
                              languageItem.level === 'متوسط' ?
                                <View style={styles.progressBorder}>
                                  <View style={styles.progressFill60}></View>
                                </View>
                                :
                                languageItem.level === 'بالا تر از متوسط' ?
                                  <View style={styles.progressBorder}>
                                    <View style={styles.progressFill80}></View>
                                  </View>
                                  :
                                  languageItem.level === 'پیشرفته' ?
                                    <View style={styles.progressBorder}>
                                      <View style={styles.progressFill100}></View>
                                    </View>
                                    :
                                    <Fragment></Fragment>
                      }
                    </View>
                  </View>
                </View>
              )
            } )
          }
          {resume.skillItem.length !== 0 &&
            resume.skillItem.map( ( skillItem: SkillItem, i: number ) => {
              return (
                <View key={i} wrap={false}>
                  {i === 0 &&
                    <View style={styles.title}>
                      <Text style={styles.titleLineRight}>___________________</Text>
                      <View>
                        <Text style={styles.titleText}>مهارت ها</Text>
                      </View>
                      <Text style={styles.titleLineLeft}>____________________</Text>
                    </View>}
                  <View>
                    <View style={{flexDirection: 'row-reverse', justifyContent: "space-between", marginBottom: 12}}>
                      <PersianText text={skillItem.skillName} fontStyle={"lightnormal"} fontSize={10} marginTop={0} marginBottom={0} />
                      {
                        skillItem.level === 'درحال یادگیری' ?
                          <View style={styles.progressBorder}>
                            <View style={styles.progressFill20}></View>
                          </View>
                          :
                          skillItem.level === 'کم تجربه' ?
                            <View style={styles.progressBorder}>
                              <View style={styles.progressFill40}></View>
                            </View>
                            :
                            skillItem.level === 'تسلط نسبی' ?
                              <View style={styles.progressBorder}>
                                <View style={styles.progressFill60}></View>
                              </View>
                              :
                              skillItem.level === 'تسلط کامل' ?
                                <View style={styles.progressBorder}>
                                  <View style={styles.progressFill80}></View>
                                </View>
                                :
                                skillItem.level === 'حرفه ای' ?
                                  <View style={styles.progressBorder}>
                                    <View style={styles.progressFill100}></View>
                                  </View>
                                  :
                                  <Fragment></Fragment>
                      }

                    </View>
                  </View>
                </View>
              )
            } )
          }
          {resume.socialMediaItem.length !== 0 &&
            resume.socialMediaItem.map( ( socialMediaItem: SocialMediaItem, i: number ) => {
              return (
                <View key={i} wrap={false}>
                  {i === 0 &&
                    <View style={styles.title}>
                      <Text style={styles.titleLineRight}>___________________</Text>
                      <View>
                        <Text style={styles.titleText}>شبکه های اجتماعی</Text>
                      </View>
                      <Text style={styles.titleLineLeft}>____________________</Text>
                    </View>}
                  <View>
                    <View style={{marginBottom: 2}}>
                      <Link style={styles.link} src={socialMediaItem.link}>
                        <PersianText text={socialMediaItem.title} fontStyle={"lightnormal"} fontSize={10} marginTop={0} marginBottom={0} />
                      </Link>
                    </View>
                  </View>
                </View>
              )
            } )
          }
        </View>
        <View style={styles.leftSection}>
          {resume.educationItem.length !== 0 &&
            <View>
              <View style={styles.title}>
                <Text style={styles.titleLineRight}>___________________</Text>
                <View>
                  <Text style={styles.titleText}>سوابق تحصیلی</Text>
                </View>
                <Text style={styles.titleLineLeft}>____________________</Text>
              </View>
              {
                resume.educationItem.map( ( educationItem: EducationItem, i: number ) => {
                  return (
                    <View key={i} style={{flexDirection: 'row-reverse', marginTop: 4, marginBottom: 4}}>
                      <View style={styles.dot}></View>
                      <View>
                        <PersianText text={`${educationItem.degree} ${educationItem.study}`} fontStyle={"bold"} fontSize={10} marginTop={0} marginBottom={0} />
                        <PersianText text={educationItem.university} fontStyle={"lightnormal"} fontSize={10} marginTop={2} marginBottom={0} />
                        <PersianText text={`${educationItem.startDate}${educationItem.startDate && educationItem.endDate && ' - '}${educationItem.endDate}`} fontStyle={"ultralight"} fontSize={9} marginTop={2} marginBottom={0} />
                      </View>
                    </View>
                  )
                } )
              }
            </View>
          }
          {resume.jobExperienceItem.length !== 0 &&
            resume.jobExperienceItem.map( ( jobExperienceItem: JobExperienceItem, i: number ) => {
              return (
                <View key={i} wrap={false}>
                  {i === 0 &&
                    <View style={styles.title}>
                      <Text style={styles.titleLineRight}>___________________</Text>
                      <View>
                        <Text style={styles.titleText}>سوابق شغلی</Text>
                      </View>
                      <Text style={styles.titleLineLeft}>____________________</Text>
                    </View>}
                  <View style={{flexDirection: 'row-reverse', marginTop: 4, marginBottom: 4}}>
                    <View style={styles.dot}></View>
                    <View>
                      <PersianText text={jobExperienceItem.jobPosition} fontStyle={"bold"} fontSize={10} marginTop={0} marginBottom={0} />
                      <PersianText text={jobExperienceItem.companyName} fontStyle={"lightnormal"} fontSize={10} marginTop={2} marginBottom={0} />
                      <PersianText text={`${jobExperienceItem.startDate}${jobExperienceItem.startDate && jobExperienceItem.endDate && ' - '}${jobExperienceItem.endDate}`} fontStyle={"ultralight"} fontSize={9} marginTop={2} marginBottom={0} />
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
                  {i === 0 &&
                    <View style={styles.title}>
                      <Text style={styles.titleLineRight}>___________________</Text>
                      <View>
                        <Text style={styles.titleText}>دوره ها و گواهی نامه ها</Text>
                      </View>
                      <Text style={styles.titleLineLeft}>____________________</Text>
                    </View>}
                  <View style={{flexDirection: 'row-reverse', marginTop: 4, marginBottom: 4}}>
                    <View style={styles.dot}></View>
                    <View>
                      <PersianText text={certificateItem.certificateName} fontStyle={"bold"} fontSize={10} marginTop={0} marginBottom={0} />
                      <PersianText text={certificateItem.institution} fontStyle={"lightnormal"} fontSize={10} marginTop={2} marginBottom={0} />
                      <PersianText text={`${certificateItem.startDate}${certificateItem.startDate && certificateItem.endDate && ' - '}${certificateItem.endDate}`} fontStyle={"ultralight"} fontSize={9} marginTop={2} marginBottom={0} />
                    </View>
                  </View>
                </View>
              )
            } )
          }
          {
            resume.projectItem.length !== 0 &&
            resume.projectItem.map( ( projectItem: ProjectItem, i: number ) => {
              return (
                <View key={i} wrap={false}>
                  {i === 0 &&
                    <View style={styles.title}>
                      <Text style={styles.titleLineRight}>___________________</Text>
                      <View>
                        <Text style={styles.titleText}>پروژه ها</Text>
                      </View>
                      <Text style={styles.titleLineLeft}>____________________</Text>
                    </View>}
                  <View style={{flexDirection: 'row-reverse', marginTop: 4, marginBottom: 4}}>
                    <View style={styles.dot}></View>
                    <View>
                      <PersianText text={`${projectItem.title}${projectItem.title && projectItem.employer && ' - '}${projectItem.employer}`} fontStyle={"normal"} fontSize={11} marginTop={0} marginBottom={0} />
                      <PersianText text={`${projectItem.startDate}${projectItem.startDate && projectItem.endDate && ' - '}${projectItem.endDate}`} fontStyle={"ultralight"} fontSize={9} marginTop={2} marginBottom={0} />
                      {projectItem.description &&
                        <Fragment>
                          <PersianText text={'توضیحات:'} fontStyle={"normal"} fontSize={10} marginTop={4} marginBottom={0} />
                          {projectItem.description && projectItem.description.split( '\n' ).map( ( line: string, i: number ) => <PersianText key={i} text={line} fontStyle={"light"} fontSize={10} marginTop={1} marginBottom={0} /> )}
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
        </View>
      </Page>
    </Document>
  )
};

export default PDFTemplate3;
